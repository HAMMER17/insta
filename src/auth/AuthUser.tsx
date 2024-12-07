import Login from '@/components/mod/Login'
import Register from '@/components/mod/Register'
import { Container } from '@chakra-ui/react'
import { useState } from 'react'

const AuthUser = () => {
  const [handle, setHandle] = useState(false)



  return (
    <Container w={'full'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
      {handle ? <Register setHandleAuth={setHandle} /> :
        <Login setHandleAuth={setHandle} />}
    </Container>
  )
}

export default AuthUser
