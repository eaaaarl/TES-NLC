/*eslint-disable @typescript-eslint/no-explicit-any*/
import { Label } from "@radix-ui/react-dropdown-menu";
import React from "react";
import { Input } from "./ui/input";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { UseFormReturn } from "react-hook-form";

interface AddressProps {
  form: UseFormReturn<any>;
}

export default function Address({ form }: AddressProps) {
  return (
    <div className="space-y-4">
      <Label>Present Address</Label>
      <FormField
        control={form.control}
        name="streetAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Street Address</FormLabel>
            <FormControl>
              <Input
                className="mt-1 w-full"
                placeholder="Street Address"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Street Address (Barangay) */}
      <FormField
        control={form.control}
        name="barangay"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Barangay</FormLabel>
            <FormControl>
              <Input
                className="mt-1 w-full"
                placeholder="Barangay"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        {/* City */}
        <div className="flex-1">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City / Municipality</FormLabel>
                <FormControl>
                  <Input
                    className="mt-1 w-full"
                    placeholder="City / Municipality"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex-1">
          <FormField
            control={form.control}
            name="state_province"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State / Province</FormLabel>
                <FormControl>
                  <Input
                    className="mt-1 w-full"
                    placeholder="State / Province"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        {/* Postal Code */}
        <div className="flex-1">
          <FormField
            control={form.control}
            name="postal_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal / Zip Code</FormLabel>
                <FormControl>
                  <Input
                    className="mt-1 w-full"
                    placeholder="Postal / Zip Code"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}