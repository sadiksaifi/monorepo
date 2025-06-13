"use client";

import { ArrowRight } from "lucide-react";

import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@workspace/ui/components/drawer";
import { useIsMobile } from "@workspace/ui/hooks/use-mobile";

export function InteractiveGateway() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer defaultOpen={!window.navigator.userActivation.hasBeenActive}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Welcome</DrawerTitle>
            <DrawerDescription>
              Thanks for visiting. We've updated our site with a fresh new look.
            </DrawerDescription>
          </DrawerHeader>

          <div className="mt-4 grid grid-row-2 gap-3 px-4">
            <div className="rounded-md bg-muted p-3">
              <div className="text-sm font-medium">New Design</div>
              <div className="mt-1 text-xs text-muted-foreground">
                Improved layout and navigation
              </div>
            </div>
            <div className="rounded-md bg-muted p-3">
              <div className="text-sm font-medium">Better Experience</div>
              <div className="mt-1 text-xs text-muted-foreground">
                Faster loading and smoother interactions
              </div>
            </div>
          </div>

          <DrawerFooter className="py-8">
            <DrawerClose asChild>
              <Button>
                Continue
                <ArrowRight />
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog defaultOpen={!window.navigator.userActivation.hasBeenActive}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome</DialogTitle>
          <DialogDescription>
            Thanks for visiting. We've updated our site with a fresh new look.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-md bg-muted p-3">
            <div className="text-sm font-medium">New Design</div>
            <div className="mt-1 text-xs text-muted-foreground">
              Improved layout and navigation
            </div>
          </div>
          <div className="rounded-md bg-muted p-3">
            <div className="text-sm font-medium">Better Experience</div>
            <div className="mt-1 text-xs text-muted-foreground">
              Faster loading and smoother interactions
            </div>
          </div>
        </div>

        <DialogFooter className="pt-3">
          <DialogClose asChild>
            <Button>
              Continue
              <ArrowRight />
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
