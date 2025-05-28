import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../lib/trpc/setup";
import { db } from "../lib/db";
import { eq, and, desc } from "drizzle-orm";
import { user, friendship, friendRequest } from "../lib/schema";

// Input validators
const addFriendSchema = z.object({
  email: z.string().email(),
});

const friendIdSchema = z.object({
  friendId: z.string(),
});

const REQUEST_TYPE = {
  INCOMING: "incoming",
  OUTGOING: "outgoing",
} as const;

export const friend = {
  // Get all friends for the current user
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const { user: sessionUser } = ctx.session;

    const friends = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      })
      .from(friendship)
      .innerJoin(user, eq(user.id, friendship.friendId))
      .where(eq(friendship.userId, sessionUser.id));

    return friends;
  }),

  getById: protectedProcedure.input(friendIdSchema).query(async ({ ctx, input }) => {
    const { friendId } = input;
    console.log(ctx.session.user.id);

    const friend = await db.query.user.findFirst({
      where: eq(user.id, friendId),
    });

    return friend;
  }),

  // Get all incoming friend requests
  getIncomingRequests: protectedProcedure.query(async ({ ctx }) => {
    const { user: sessionUser } = ctx.session;

    const requests = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      })
      .from(friendRequest)
      .innerJoin(user, eq(user.id, friendRequest.senderId))
      .where(eq(friendRequest.receiverId, sessionUser.id))
      .orderBy(desc(friendRequest.createdAt));

    const data = requests.map((request) => ({
      ...request,
      requestType: REQUEST_TYPE.INCOMING,
    }));

    return data ?? [];
  }),

  // Get all outgoing friend requests
  getOutgoingRequests: protectedProcedure.query(async ({ ctx }) => {
    const { user: sessionUser } = ctx.session;

    const requests = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      })
      .from(friendRequest)
      .innerJoin(user, eq(user.id, friendRequest.receiverId))
      .where(eq(friendRequest.senderId, sessionUser.id))
      .orderBy(desc(friendRequest.createdAt));

    const data = requests.map((request) => ({
      ...request,
      requestType: REQUEST_TYPE.OUTGOING,
    }));

    return data ?? [];
  }),

  // Send a friend request
  add: protectedProcedure.input(addFriendSchema).mutation(async ({ ctx, input }) => {
    const { user: sessionUser } = ctx.session;

    // Find the user by email
    const userToAdd = await db.query.user.findFirst({
      where: eq(user.email, input.email),
    });

    if (!userToAdd) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No user found with this email",
      });
    }

    const idToAdd = userToAdd.id;

    if (idToAdd === sessionUser.id) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "You cannot add yourself as a friend",
      });
    }

    // Check if friend request already exists
    const existingRequest = await db.query.friendRequest.findFirst({
      where: and(
        eq(friendRequest.senderId, sessionUser.id),
        eq(friendRequest.receiverId, idToAdd),
      ),
    });

    if (existingRequest) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Friend request already sent",
      });
    }

    // Check if they're already friends (either direction)
    const existingFriendship = await db.query.friendship.findFirst({
      where: and(eq(friendship.userId, sessionUser.id), eq(friendship.friendId, idToAdd)),
    });

    if (existingFriendship) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "You are already friends with this user",
      });
    }

    // Create the friend request
    await db.insert(friendRequest).values({
      senderId: sessionUser.id,
      receiverId: idToAdd,
      createdAt: new Date(),
    });

    // Trigger realtime notification if you're using Pusher
    // await pusherServer.trigger(
    //   toPusherKey(`user:${idToAdd}:incoming_friend_requests`),
    //   "incoming_friend_requests",
    //   {
    //     senderId: sessionUser.id,
    //     senderEmail: sessionUser.email,
    //   },
    // );

    return { success: true };
  }),

  // Accept a friend request
  acceptRequest: protectedProcedure
    .input(friendIdSchema)
    .mutation(async ({ ctx, input }) => {
      const { user: sessionUser } = ctx.session;
      const { friendId } = input;

      // Check if the friend request exists
      const existingRequest = await db.query.friendRequest.findFirst({
        where: and(
          eq(friendRequest.senderId, friendId),
          eq(friendRequest.receiverId, sessionUser.id),
        ),
      });

      if (!existingRequest) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No friend request found",
        });
      }

      // Delete the friend request
      await db
        .delete(friendRequest)
        .where(
          and(
            eq(friendRequest.senderId, friendId),
            eq(friendRequest.receiverId, sessionUser.id),
          ),
        );

      // Create the friendship for the session user
      await db.insert(friendship).values({
        userId: sessionUser.id,
        friendId: friendId,
        createdAt: new Date(),
      });

      // Create the friendship for the friend
      await db.insert(friendship).values({
        userId: friendId,
        friendId: sessionUser.id,
        createdAt: new Date(),
      });

      // Notify the sender that their request was accepted
      // await pusherServer.trigger(toPusherKey(`user:${friendId}:friends`), "new_friend", {
      //   userId: sessionUser.id,
      //   email: sessionUser.email,
      // });

      return { success: true };
    }),

  // Deny a friend request
  denyRequest: protectedProcedure
    .input(friendIdSchema)
    .mutation(async ({ ctx, input }) => {
      const { user: sessionUser } = ctx.session;
      const { friendId } = input;

      // Check if the friend request exists
      const existingRequest = await db.query.friendRequest.findFirst({
        where: and(
          eq(friendRequest.senderId, friendId),
          eq(friendRequest.receiverId, sessionUser.id),
        ),
      });

      if (!existingRequest) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No friend request found",
        });
      }

      // Delete the friend request
      await db
        .delete(friendRequest)
        .where(
          and(
            eq(friendRequest.senderId, friendId),
            eq(friendRequest.receiverId, sessionUser.id),
          ),
        );

      return { success: true };
    }),

  // Remove a friend (delete the friendship)
  remove: protectedProcedure.input(friendIdSchema).mutation(async ({ ctx, input }) => {
    const { user: sessionUser } = ctx.session;
    const { friendId } = input;

    // Check if they're friends
    const existingFriendship = await db.query.friendship.findFirst({
      where: and(
        eq(friendship.userId, sessionUser.id),
        eq(friendship.friendId, friendId),
      ),
    });

    if (!existingFriendship) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "You are not friends with this user",
      });
    }

    // Delete both friendship record
    await db
      .delete(friendship)
      .where(
        and(eq(friendship.userId, sessionUser.id), eq(friendship.friendId, friendId)),
      );

    await db
      .delete(friendship)
      .where(
        and(eq(friendship.userId, friendId), eq(friendship.friendId, sessionUser.id)),
      );

    return { success: true };
  }),
};
