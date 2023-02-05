import type { NextPage } from 'next'
import NextLink from 'next/link'
import Head from 'next/head'

import {
  FormControl,
  FormLabel,
  // FormErrorMessage,
  // FormHelperText,
  Input,
  Select,
  Button,
  Center,
  Card,
  chakra,
  Heading,
  Link,
  CardBody,
  CardFooter,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { hashPassword } from 'lib/bcrypt'
import { useRouter } from 'next/router'

const Signup: NextPage = () => {
  // const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  const router = useRouter()
  // const [password, setPassword] = useState('')
  const [allReadyUser, setAllReadyUser] = useState(false)
  // const [img, setImg] = useState('')

  const handleSubmit = async (e: { preventDefault?: any; target: any }) => {
    e.preventDefault()
    const { target } = e

    const image = `https://avatars.dicebear.com/api/initials/${target.name.value}.svg`
    const name = target.name.value
    const email = target.email.value
    const password = await hashPassword(target.password.value)
    const role = target.role.value

    const getOne = await fetch(`api/user?type=one&email=${email}`)
    const isUserAlReady = await getOne.json()

    if (!isUserAlReady) {
      const res = await fetch('api/user', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          image,
          password,
          role,
          provider: 'credentials',
        }),
      })

      const data = await res.json()
      if (data) {
        console.log({ data })
        router.push('/notes')
      }
    } else {
      setAllReadyUser(true)
    }
  }

  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/asignacion.png' />
      </Head>

      <chakra.header
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        bg='#09f'
        boxShadow='lg'
        px={4}
        py={3}
        mb={3}>
        <Link
          as={NextLink}
          href='/'
          fontSize='lg'
          fontWeight='bold'
          _hover={{ textDecoration: 'none' }}>
          <Heading>Free Task</Heading>
        </Link>

        <>
          <Link onClick={() => signIn()} fontWeight='bold'>
            Sign In
          </Link>
        </>
      </chakra.header>

      <main>
        <Center h='calc(100vh - 80px)'>
          <Card px='6' py='10' w='clamp(270px,50%, 400px)'>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    name='name'
                    type='text'
                    required={true}
                    // onChange={(res) => setName(res.target.value)}
                  />

                  <FormLabel>Email address</FormLabel>
                  <Input
                    name='email'
                    type='email'
                    required={true}
                    // onChange={(res) => setEmail(res.target.value)}
                  />

                  <FormLabel>Password</FormLabel>
                  <Input
                    name='password'
                    type='password'
                    required={true}
                    // onChange={(res) => setPassword(res.target.value)}
                  />

                  <FormLabel>Role</FormLabel>
                  <Select
                    name='role'
                    // onChange={(res) => setRole(res.target.value)}
                  >
                    <option value='admin'>Admin</option>
                    <option value='edit'>Edit</option>
                    <option value='read'>Read</option>
                  </Select>

                  <Center mt='4'>
                    <Button type='submit' variant='blue'>
                      Sign Up
                    </Button>
                  </Center>
                </FormControl>
              </form>
            </CardBody>
            {allReadyUser && (
              <CardFooter>
                <Text color='red'>That user is all ready registered</Text>
              </CardFooter>
            )}
          </Card>
        </Center>
      </main>
    </>
  )
}

export default Signup
