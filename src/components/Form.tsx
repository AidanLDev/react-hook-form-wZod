/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Stack, Typography } from '@mui/material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TSignUpSchema, signUpSchema } from '../lib/types';


export default function Form() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema)
  });

  const onSubmit = async (data: TSignUpSchema) => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Req made to the fake server with the following data: ', data);

    reset();
  };
  return (
    <Stack>
      <h1>Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{
        display:'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <input
          {...register('email')}
          type='email'
          placeholder='email'
        />
        {errors.email && (
          <ErrorText>
            {`${errors.email.message}`}
          </ErrorText>
        )}
        <input
          {...register('password')}
          type='password'
          placeholder='Password'
        />
                {errors.password && (
          <ErrorText>
            {`${errors.password.message}`}
          </ErrorText>
        )}
        <input
          {...register('confirmPassword')}
          type='password'
          placeholder='Confirm Password'
        />
                {errors.confirmPassword && (
          <ErrorText>
            {`${errors.confirmPassword.message}`}
          </ErrorText>
        )}
        <button
          type='submit'
          onSubmit={() => console.log('submitted')}
          disabled={isSubmitting}
        >
          Submit
        </button>
      </form>
    </Stack>
  );
}

const ErrorText = ({ children }: { children: ReactNode })  => <Typography sx={{ color: 'red' }}>
  {children}
</Typography>
