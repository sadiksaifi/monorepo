import { authClient } from "@/lib/auth-client";
import { TabNavigation } from "@/lib/components/tab-navigation";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { Loader, Trash } from "lucide-react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";

export const Route = createFileRoute("/_app/profile/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const { mutate: addPasskey, isPending: isAddPassKeyPending } = useMutation({
    mutationFn: async () => {
      const res = await authClient.passkey.addPasskey({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        name: navigator?.userAgentData?.platform ?? navigator.platform ?? "N/A",
      });
      const error = res?.error;
      const data = res?.data;

      if (error) {
        console.log("PasskeyError: ", error);
        if (error instanceof Error) {
          toast.error("Something went wrong!", {
            description: error.message,
          });
        }
      }
      refetch();
      console.log("passkeyData: ", data);
    },
  });

  const {
    isPending: isPendingPasskeys,
    data: passkeys,
    refetch,
    error: listPasskeysError,
  } = authClient.useListPasskeys();
  console.log("ListPasskeyError: ", listPasskeysError);

  const { mutate: deletePasskey, isPending: isDeletePasskeyPending } = useMutation({
    mutationFn: async (id: string) => {
      const res = await authClient.passkey.deletePasskey({
        id: id,
      });
      const error = res?.error;
      const data = res?.data;

      if (error) {
        console.log("DeletePasskeyError: ", error);
        if (error instanceof Error) {
          toast.error("Something went wrong!", {
            description: error.message,
          });
        }
      }
      refetch();
      console.log("passkeyData: ", data);
    },
  });

  return (
    <TabNavigation.Content className="p-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 mb-4">
          <h1 className="font-bold text-2xl">Sign-in Methods</h1>
          <p>
            Customize how you access your account. Link your Git profiles and set up
            passkeys for seamless, secure authentication.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-xl">Passkeys</h3>
          <p>Configure you passkeys here.</p>
        </div>
        <div className="px-2">
          {passkeys && passkeys?.length <= 0 && (
            <p>No passkey found, Please create one</p>
          )}
          {isPendingPasskeys ? (
            <p>Loading Passkeys...</p>
          ) : (
            <Accordion type="single" collapsible>
              {passkeys?.map((data) => (
                <AccordionItem value={data.id}>
                  <AccordionTrigger className="underline-none">
                    Name: {data.name ? data.name : "N/A"}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex justify-between items-center">
                      <p>
                        <b className="font-bold">Created At: </b>
                        {data.createdAt.toLocaleString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                      <div>
                        <Button
                          onClick={() => deletePasskey(data.id)}
                          variant="destructive"
                          disabled={isDeletePasskeyPending}
                        >
                          {isDeletePasskeyPending ? (
                            <Loader className="animate-spin size-4" />
                          ) : (
                            <Trash />
                          )}
                          Delete
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
        <Button
          disabled={isAddPassKeyPending}
          onClick={() => addPasskey()}
          className="w-fit ml-auto"
        >
          {isAddPassKeyPending && <Loader className="animate-spin size-4" />}
          Add a New Passkey
        </Button>
      </div>
    </TabNavigation.Content>
  );
}
