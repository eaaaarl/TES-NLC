import React, { useRef } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

interface CropImageDialogProps {
  onOpen: boolean;
  src: string | null;
  onCropped: (blob: Blob | null) => void;
  cropAspectRatio: number;
  onClose: () => void;
  isLoading: boolean;
}

export default function CropImageDialog({
  onOpen,
  src,
  onCropped,
  cropAspectRatio,
  onClose,
  isLoading,
}: CropImageDialogProps) {
  const cropperRef = useRef<ReactCropperElement>(null);

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => {
        onCropped(blob);
      }, "image/webp");
    }
  };

  return (
    <Dialog open={onOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Take a Photo</DialogTitle>
        </DialogHeader>
        <div className="w-full h-64">
          <Cropper
            ref={cropperRef}
            src={src ?? undefined}
            style={{ height: "100%", width: "100%" }}
            aspectRatio={cropAspectRatio}
            guides={false}
            viewMode={1}
            dragMode="move"
          />
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCrop} className="mb-3" disabled={isLoading}>{isLoading ? (<Loader2 className="h-4 w-4 animate-spin" />) : ("Save")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
