import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

type ColorScheme = 'blue' | 'green' | 'purple' | 'orange';

interface ColorClasses {
    icon: string;
    badge: string;
    hover: string;
}

type ColorMap = {
    [K in ColorScheme]: ColorClasses;
};

// Action button interface
interface ActionButton {
    icon?: LucideIcon;
    label: string;
}

// Main component props interface
interface MetricCardProps {
    icon: LucideIcon;
    label: string;
    value: string | number;
    color: ColorScheme;
    badge?: string;
    action?: ActionButton;
    disabled?: boolean;
    tooltipText?: string;
    onClick?: () => void;
    className?: string;
}

const colorMap: ColorMap = {
    blue: {
        icon: "bg-blue-50 text-blue-600",
        badge: "bg-blue-50 text-blue-700",
        hover: "hover:border-blue-100"
    },
    green: {
        icon: "bg-green-50 text-green-600",
        badge: "bg-green-50 text-green-700",
        hover: "hover:border-green-100"
    },
    purple: {
        icon: "bg-purple-50 text-purple-600",
        badge: "bg-purple-50 text-purple-700",
        hover: "hover:border-purple-100"
    },
    orange: {
        icon: "bg-orange-50 text-orange-600",
        badge: "bg-orange-50 text-orange-700",
        hover: "hover:border-orange-100"
    }
};

const MetricCard: React.FC<MetricCardProps> = ({
    icon: Icon,
    label,
    value,
    color,
    badge,
    action,
    disabled = false,
    tooltipText,
    onClick,
    className = "",
}) => {
    const colorClasses = colorMap[color];

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onClick?.();
    };

    return (
        <Card
            className={`transition-all duration-200 border hover:shadow-md ${colorClasses.hover} ${className}`}
        >
            <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${colorClasses.icon}`}>
                        <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-500 truncate">
                            {label}
                        </p>
                        <p className="text-2xl font-bold text-gray-900 truncate">
                            {value}
                        </p>
                    </div>
                </div>

                {(badge || action) && (
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        {badge && (
                            <Badge
                                variant="secondary"
                                className={`${colorClasses.badge} font-medium truncate`}
                            >
                                {badge}
                            </Badge>
                        )}
                        {action && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={handleClick}
                                            disabled={disabled}
                                            className={`flex items-center gap-2 ${colorClasses.hover}`}
                                            type="button"
                                        >
                                            {action.icon && <action.icon className="h-4 w-4" />}
                                            {action.label}
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {tooltipText || action.label}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default MetricCard;