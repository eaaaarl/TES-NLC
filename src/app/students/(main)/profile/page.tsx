"use client";
import { Button } from "@/components/ui/button";
import {
  Album,
  Atom,
  Facebook,
  House,
  Info,
  LucideIcon,
  Mail,
  Video,
} from "lucide-react";
import Image from "next/image";
import React, { lazy, Suspense, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getStudent } from "./action";
import { useSubmitAvatar } from "./mutation";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import Resizer from "react-image-file-resizer";
import ProfileSkeleton from "./ProfileSectionSkeleton";
import { Badge } from "@/components/ui/badge";

const CropImageDialog = lazy(() => import('@/components/CropImageDialog'));

const ProfileSection = ({ title, icon: Icon, children }: { title: string, icon: LucideIcon, children: React.ReactNode }) => {
  return (<>
    <div className="mx-10 mt-10 flex items-center">
      <Icon className="mr-4 text-blue-900" />
      <span className="text-1xl text-blue-900 font-bold">{title}</span>
    </div>
    {children}
  </>)
}

const ProfileField = ({
  className,
  label,
  isLoading,
  value,
  transform = 'none'
}: {
  className?: string,
  label: string,
  value?: string | number,
  isLoading: boolean,
  transform?: 'uppercase' | 'lowercase' | 'none'
}) => {
  const transformValue = (val: string | number | undefined) => {
    if (typeof val === 'string') {
      switch (transform) {
        case 'uppercase':
          return val.toUpperCase();
        case 'lowercase':
          return val.toLowerCase();
        default:
          return val;
      }
    }
    return val;
  };

  return (
    <div className={className}>
      <p className="text-gray-400 text-sm">{label}</p>
      {isLoading ? (
        <Skeleton className="h-6 w-full my-3" />
      ) : (
        <p className={`mb-3 ${!value ? "mt-9" : ""}`}>
          {transformValue(value) || ""}
        </p>
      )}
      <hr />
    </div>
  );
};

const CropDialogSkeleton = () => (
  <div className="w-[500px] max-w-md mx-auto p-6 space-y-4">
    <div className="space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
    <Skeleton className="h-64 w-full rounded-lg" />
    <div className="flex justify-end space-x-2">
      <Skeleton className="h-10 w-20" />
      <Skeleton className="h-10 w-20" />
    </div>
  </div>
);

export default function ProfilePage() {
  const { toast } = useToast()
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const { data: studentInfo, isLoading, isError } = useQuery({
    queryKey: ["students", "profile"],
    queryFn: getStudent,
  });

  const resizeFile = (file: File) =>
    new Promise<string>((resolve) => {
      Resizer.imageFileResizer(
        file,
        1024,
        1024,
        "webp",
        100,
        0,
        (uri) => {
          resolve(uri as string);
        },
        "base64"
      );
    });

  const handleImageSelection = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const resizedImageUrl = await resizeFile(file);
      setSelectedImage(resizedImageUrl);
      setDialogOpen(true);
    }
  };


  const { mutate, status } = useSubmitAvatar()
  const handleTakePhoto = async (blob: Blob | null) => {
    if (blob && studentInfo) {
      const file = new File([blob], `avatar_${studentInfo.id}.webp`, {
        type: "image/webp",
      });
      mutate({ avatar: file }, {
        onSuccess: () => {
          toast({
            description: "Avatar updated.",
          });
          setDialogOpen(false);
        },
        onError: () => {
          toast({
            description: "Failed to update avatar. Please try again.",
            variant: "destructive",
          });
        },
      });
    }

  };
  const handleFileInputClick = () => {
    inputFileRef.current?.click();
  };

  if (isLoading) {
    return <ProfileSkeleton />
  }

  if (isError) return <p>Error loading student data</p>;
  return (
    <div className="min-h-screen flex justify-center items-center my-10">
      <div className="w-full max-w-4xl p-4 bg-white shadow-lg rounded-lg">
        <div className="mb-16">
          <Button className="float-end bg-blue-900" disabled={true}>
            Edit
          </Button>
        </div>

        <div className="flex justify-center">
          <div className="flex flex-col items-center">
            {isLoading ? (<Skeleton className="w-[250px] h-[250px] rounded-full mb-3" />) : (
              <Image
                src={studentInfo?.avatarUrl || '/default-user.png'}
                alt="Profile"
                width={250}
                height={250}
                className="mb-3 shadow-lg border rounded-lg"
              />
            )}

            <input
              ref={inputFileRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelection}
              style={{ display: "none" }}
            />

            <Button
              className="bg-blue-900 text-white px-4 py-2 rounded-lg"
              onClick={handleFileInputClick}
            >
              Take a Photo
            </Button>
          </div>
        </div>

        <Suspense
          fallback={
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white rounded-lg">
                <CropDialogSkeleton />
              </div>
            </div>
          }
        >
          {dialogOpen && (<CropImageDialog
            src={selectedImage}
            onCropped={handleTakePhoto}
            onOpen={dialogOpen}
            cropAspectRatio={1}
            onClose={() => setDialogOpen(false)}
            isLoading={status === 'pending'}
          />)}
        </Suspense>


        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-10 mb-5">
          <div>
            <ProfileField
              label="Student No."
              value={studentInfo?.studentID}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Full Name Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-10">
          <div>
            <ProfileField
              label="First name"
              value={studentInfo?.firstname.toUpperCase()}
              isLoading={isLoading}
            />
          </div>
          <div>
            <ProfileField
              label="Middle name"
              value={studentInfo?.middlename.toUpperCase()}
              isLoading={isLoading}
            />
          </div>
          <div>
            <ProfileField
              label="Last name"
              value={studentInfo?.lastname.toUpperCase()}
              isLoading={isLoading}
            />
          </div>
          <div>
            <ProfileField
              label="Suffix"
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Learner's Ref Number */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-10 mb-5">
          <div>
            <ProfileField
              label="Learner&apos;s Ref Number"
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Course Year Section */}
        <ProfileSection title='COURSE YEAR' icon={Album} >
          <div className="mx-10 mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            <div>
              <ProfileField
                label="Course"
                value={studentInfo?.course.courseName.toUpperCase()}
                isLoading={isLoading}
              />
            </div>
            <div>
              <ProfileField
                label="Department"
                value={studentInfo?.department.departmentName.toUpperCase()}
                isLoading={isLoading}
              />
            </div>
          </div>
          <div className="mx-10 grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
            <div>
              <ProfileField
                label="Year Level"
                value={studentInfo?.yearLevel?.yearName?.toUpperCase() || (<Badge>Not Assigned</Badge>)}
                isLoading={isLoading}
              />
            </div>
            <div>
              <ProfileField
                label="Section"
                value={studentInfo?.section?.sectionName?.toUpperCase() || (<Badge>Not Assigned</Badge>)}
                isLoading={isLoading}
              />
            </div>
          </div>
        </ProfileSection>

        <ProfileSection title="PERSONAL INFO" icon={Info}>
          <div className="mx-10 mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <ProfileField
                label="Gender"
                value={studentInfo?.gender.toUpperCase()}
                isLoading={isLoading}
              />
            </div>
            <div>
              <ProfileField
                label="Civil Status"
                isLoading={isLoading}
              />
            </div>
            <div>
              <ProfileField
                label="Birthday"
                value={studentInfo?.birthdate}
                isLoading={isLoading}
              />
            </div>
          </div>

          <div className="mx-10 mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="col-span-2">
              <ProfileField
                label="Birth Place"
                isLoading={isLoading}
              />
            </div>
            <div>
              <ProfileField
                label="Age"
                isLoading={isLoading}
              />
            </div>
          </div>

          <div className="mx-10 mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <ProfileField
                label="Nationality"
                isLoading={isLoading}
              />
            </div>
            <div>
              <ProfileField
                label="Religion"
                isLoading={isLoading}
              />
            </div>
            <div>
              <ProfileField
                label="Ethnicity"
                isLoading={isLoading}
              />
            </div>
          </div>
        </ProfileSection>

        <ProfileSection title="CONTACT & ADDRESS" icon={House}>
          <div className="mx-10 mt-5 grid grid-cols-1 gap-4">
            <div className="col-span-2">
              <ProfileField
                label="Contact Number"
                value={studentInfo?.contact_no}
                isLoading={isLoading}
              />
            </div>
          </div>
          <div className="mx-10 mt-5 grid grid-cols-1 gap-4">
            <div className="col-span-2">
              <p className="text-gray-400 text-sm ">Permanent Address</p>
              <p className="mb-3">
                {studentInfo?.streetAddress.toUpperCase()},{" "}
                {studentInfo?.barangay.toUpperCase()}{" "}
                {studentInfo?.city.toUpperCase()},{" "}
                {studentInfo?.state_province.toUpperCase()},{" "}
                {studentInfo?.postal_code}
              </p>
              <hr />
            </div>
          </div>
          <div className="mx-10 mt-5 grid grid-cols-1 gap-4">
            <div className="col-span-2">
              <p className="text-gray-400 text-sm ">Current Address</p>
              <p className="mb-3">
                {studentInfo?.streetAddress.toUpperCase()},{" "}
                {studentInfo?.barangay.toUpperCase()}{" "}
                {studentInfo?.city.toUpperCase()},{" "}
                {studentInfo?.state_province.toUpperCase()},{" "}
                {studentInfo?.postal_code}
              </p>
              <hr />
            </div>
          </div>
        </ProfileSection>

        <ProfileSection title="SOCIAL MEDIA ACCOUNTS" icon={Atom}>
          <div className="mx-10 mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <Mail className="mr-3 float-start items-center" />
              <ProfileField
                label="Email"
                value={studentInfo?.email}
                isLoading={isLoading}
                transform="lowercase"
              />
            </div>
            <div>
              <Facebook className="mr-3 float-start items-center" />
              <ProfileField
                label="Facebook"
                isLoading={isLoading}
              />
            </div>
          </div>
          <div className="mx-10 mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <Mail className="mr-3 float-start items-center" />
              <ProfileField
                label="Skype"
                isLoading={isLoading}
              />
            </div>
            <div>
              <Video className="mr-3 float-start items-center" />
              <ProfileField
                label="Zoom"
                isLoading={isLoading}
              />
            </div>
          </div>
        </ProfileSection>
      </div>
    </div >
  );
}
