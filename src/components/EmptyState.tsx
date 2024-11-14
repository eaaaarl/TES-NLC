import React from 'react';
import { UserX, LucideIcon } from 'lucide-react';

interface EmptyStateProps {
    title?: string;
    message?: string;
    icon?: LucideIcon;
    iconClassName?: string;
}

const EmptyState = ({
    title = "No data available",
    message = "No records found.",
    icon: Icon = UserX,
    iconClassName = "w-8 h-8 text-gray-400 dark:text-gray-500"
}: EmptyStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-full p-4 mb-4">
                <Icon className={iconClassName} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
                {title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm">
                {message}
            </p>
        </div>
    );
};

export default EmptyState;