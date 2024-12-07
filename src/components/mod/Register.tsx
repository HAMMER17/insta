"use client"
import { Button } from "../ui/button"
import { Input, Stack, Text } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { useForm } from "react-hook-form"
import useCreateUser from "@/hooks/useCreateUser"

import { Toaster } from "../ui/toaster"

interface FormValues {
  username: string
  email: string
  password: string
}

const Register = ({ setHandleAuth }: any) => {
  const { register, handleSubmit,  formState: { errors },
  } = useForm<FormValues>()

  const { SignUp, error } = useCreateUser()

  const onSubmit = handleSubmit((data) =>
    SignUp(data)
  )

  return (
    <>
      <form onSubmit={onSubmit}>

        <Stack gap="4" alignItems="center" justifyContent={'center'} w={'300px'} minH={'100vh'}>
          <Text fontFamily={'fantasy'} fontSize={30}>Register</Text>
          <Field fontFamily={'cursive'}
            label="First name"
            invalid={!!errors.username}
            errorText={errors.username?.message}
          >
            <Input p={2} variant="subtle"
              {...register("username", { required: "Username is required" })}
            />
          </Field>
          <Field fontFamily={'cursive'}
            label="Email"
            invalid={!!errors.email}
            errorText={errors.email?.message}
          >
            <Input p={2} variant="subtle"
              {...register("email", { required: "Email is required" })}
            />
          </Field>
          <Field fontFamily={'cursive'}
            label="Password"
            invalid={!!errors.password}
            errorText={errors.password?.message}
          >
            <Input p={2} variant="subtle"
              {...register("password", { required: "Password is required" })}
            />
          </Field>
          <Button type="submit" p={4} w={'full'} bg={'green'} color={'white'} _hover={{ bg: 'green.500' }}
            fontFamily={'cursive'} loading={error}>Sign Up</Button>
          <Text fontFamily={'cursive'}>Have you account <Button cursor={'pointer'} p={4}
            m={2} onClick={() => setHandleAuth((pre: any) => !pre)}>Login</Button> </Text>
          <Toaster />
        </Stack>

      </form>
      {/* <Toaster /> */}
    </>
  )
}




export default Register
