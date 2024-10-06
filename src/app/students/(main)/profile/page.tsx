"use client";
import { Button } from "@/components/ui/button";
import {
  Album,
  Atom,
  CircleUser,
  Facebook,
  House,
  Info,
  Mail,
  Video,
} from "lucide-react";
import { useSession } from "../SessionProvider";

export default function ProfilePage() {
  const { studentInfo } = useSession();

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
            {/* <Image
              src="/asssets/nemsu-logo.png"
              alt="Profile"
              width={128}
              height={128}
              className=" rounded-full object-cover mb-4"
            /> */}
            <CircleUser className="h-32 w-32 rounded-full object-cover mb-4" />
            <Button
              className="bg-blue-900 text-white px-4 py-2 rounded-lg"
              disabled={true}
            >
              Take a Photo
            </Button>
          </div>
        </div>

        {/* Student No. */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-10 mb-5">
          <div>
            <p className="text-gray-400 text-sm">Student No.</p>
            <p className="mb-3">{studentInfo?.studentID}</p>
            <hr />
          </div>
        </div>

        {/* Full Name Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-10">
          <div>
            <p className="text-gray-400 text-sm">First name</p>
            <p className="mb-3">{studentInfo?.firstname.toUpperCase()}</p>
            <hr />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Middle name</p>
            <p className={`mb-3 ${!studentInfo?.middlename ? "mt-9" : ""}`}>
              {studentInfo?.middlename.toUpperCase()}
            </p>
            <hr />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Last name</p>
            <p className="mb-3">{studentInfo?.lastname.toUpperCase()}</p>
            <hr />
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-9">Suffix</p>
            <p className="mb-3 mt-9"></p>
            <hr />
          </div>
        </div>

        {/* Learner's Ref Number */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-10 mb-5">
          <div>
            <p className="text-gray-400 text-sm">Learner&apos;s Ref Number</p>
            <p className="mb-3 mt-9"></p>
            <hr />
          </div>
        </div>

        {/* Course Year Section */}
        <div className="mx-10 mt-10 flex items-center">
          <Album className="mr-4 text-blue-900" />
          <span className="text-1xl text-blue-900 font-bold">COURSE YEAR</span>
        </div>

        <div className="mx-10 mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400 text-sm">Course</p>
            <p className="mb-3">
              {studentInfo?.course.courseName.toUpperCase()}
            </p>
            <hr />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Year Level</p>
            <p className="mb-3">{studentInfo?.yearlevel.toUpperCase()}</p>
            <hr />
          </div>
        </div>
        <div className="mx-10 grid grid-cols-1 gap-4 mt-5">
          <div>
            <p className="text-gray-400 text-sm">Curriculum</p>
            <p className="mb-3 mt-9"></p>
            <hr />
          </div>
        </div>

        <div className="mx-10 mt-10 flex items-center">
          <Info className="mr-4 text-blue-900" />
          <span className="text-1xl text-blue-900 font-bold">
            PERSONAL INFO
          </span>
        </div>

        <div className="mx-10 mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <p className="text-gray-400 text-sm">Gender</p>
            <p className="mb-3">{studentInfo?.gender.toUpperCase()}</p>
            <hr />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Civil Status</p>
            <p className="mb-3 mt-9"></p>
            <hr />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Birthday</p>
            <p className="mb-3">{studentInfo?.birthdate}</p>
            <hr />
          </div>
        </div>

        <div className="mx-10 mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="col-span-2">
            <p className="text-gray-400 text-sm ">Birth Place</p>
            <p className="mb-3 mt-9"></p>
            <hr />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Age</p>
            <p className="mb-3 mt-9"></p>
            <hr />
          </div>
        </div>

        <div className="mx-10 mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <p className="text-gray-400 text-sm">Nationality</p>
            <p className="mb-3 mt-9"></p>
            <hr />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Religion</p>
            <p className="mb-3 mt-9"></p>
            <hr />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Ethnicity</p>
            <p className="mb-3 mt-9"></p>
            <hr />
          </div>
        </div>

        <div className="mx-10 mt-10 flex items-center">
          <House className="mr-4 text-blue-900" />
          <span className="text-1xl text-blue-900 font-bold">
            CONTACT & ADDRESS
          </span>
        </div>

        <div className="mx-10 mt-5 grid grid-cols-1 gap-4">
          <div className="col-span-2">
            <p className="text-gray-400 text-sm ">Contact Number</p>
            <p className={`mb-3 ${!studentInfo?.contact_no ? "mt-9" : ""}`}>
              {studentInfo?.contact_no}
            </p>
            <hr />
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

        <div className="mx-10 mt-10 flex items-center">
          <Atom className="mr-4 text-blue-900" />
          <span className="text-1xl text-blue-900 font-bold">
            SOCIAL MEDIA ACCOUNTS
          </span>
        </div>

        <div className="mx-10 mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <Mail className="mr-3 float-start items-center" />
            <p className="text-gray-400 text-sm ">Email</p>
            <p className="mb-3">{studentInfo?.email}</p>
            <hr />
          </div>
          <div>
            <Facebook className="mr-3 float-start items-center" />
            <p className="text-gray-400 text-sm">Facebook</p>
            <p className="mb-3 mt-9"></p>
            <hr />
          </div>
        </div>
        <div className="mx-10 mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <Mail className="mr-3 float-start items-center" />
            <p className="text-gray-400 text-sm ">Skype</p>
            <p className="mb-3 mt-9"></p>
            <hr />
          </div>
          <div>
            <Video className="mr-3 float-start items-center" />
            <p className="text-gray-400 text-sm">Zoom</p>
            <p className="mb-3 mt-9"></p>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}
