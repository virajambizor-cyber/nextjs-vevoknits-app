'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import ButtonLoading from '@/components/Application/ButtonLoading';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp';

// Zod schema for OTP verification
const otpSchema = z.object({
  email: z.string().email('Invalid email'),
  otp: z
    .string()
    .regex(/^\d{6}$/, 'Enter the 6-digit OTP'),
});

export default function Otpverification({ email, onSubmit, loading }) {
  const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { email: email || '', otp: '' },
  });

  const handleSubmit = (values) => {
    onSubmit?.(values);
  };

  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold">Verify OTP</h1>
        <p className="text-sm text-muted-foreground">
          We’ve sent a 6-digit code to <span className="font-medium">{email}</span>
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter OTP</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} value={field.value} onChange={field.onChange}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Hidden email field so email is validated/sent */}
          <input type="hidden" {...form.register('email')} value={email} />

          <ButtonLoading
            loading={loading}
            type="submit"
            text="Verify & Continue"
            className="w-full cursor-pointer"
          />
        </form>
      </Form>
    </div>
  );
}
