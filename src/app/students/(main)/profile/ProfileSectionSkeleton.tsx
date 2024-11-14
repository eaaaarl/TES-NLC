import { Skeleton } from "@/components/ui/skeleton";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProfileSectionSkeleton = ({ title }: { title?: string }) => (
    <div className="mt-10">
        <div className="mx-10 flex items-center">
            <Skeleton className="h-5 w-5 mr-4" />
            <Skeleton className="h-6 w-32" />
        </div>
        <div className="mx-10 mt-5">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <div key={i}>
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-px w-full mt-3" />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const ProfileHeaderSkeleton = () => (
    <div className="flex flex-col items-center">
        <Skeleton className="w-[250px] h-[250px] rounded-lg mb-3" />
        <Skeleton className="h-10 w-32 rounded-lg" />
    </div>
);

const ProfileFieldsSkeleton = () => (
    <div className="mx-10 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-px w-full" />
                </div>
            ))}
        </div>
    </div>
);

export const ProfileSkeleton = () => {
    return (
        <div className="min-h-screen flex justify-center items-center my-10">
            <div className="w-full max-w-4xl p-4 bg-white shadow-lg rounded-lg">
                <div className="mb-16 flex justify-end">
                    <Skeleton className="h-10 w-20 rounded-lg" />
                </div>

                <ProfileHeaderSkeleton />
                <ProfileFieldsSkeleton />

                {["Course Year", "Personal Info", "Contact & Address", "Social Media"].map((title) => (
                    <ProfileSectionSkeleton key={title} title={title} />
                ))}
            </div>
        </div>
    );
};

export default ProfileSkeleton;