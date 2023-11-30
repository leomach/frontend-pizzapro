import { useContext, FormEvent, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/AuthContext'
import Link from 'next/link'
import { canSSRGuest } from '@/utils/canSSRGuest'

import logoImg from '../../public/pizzapro-logo.png'

export default function Home() {
  const { signIn } = useContext(AuthContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    if(email === '' || password === '') {
      toast.error('Por favor, preencha os dados')
      return;
    }

    setLoading(true);
    let data = {
      email,
      password
    }

    await signIn(data)
    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>PizzaPro - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt='Logo PizzaPro' width={350} />
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input placeholder='Digite seu email' value={email} onChange={(e) => {setEmail(e.target.value)}} type='text' />
            <Input placeholder='Digite sua senha' value={password} onChange={(e) => {setPassword(e.target.value)}} type='password' />
            <Button type="submit" loading={loading}>Acessar</Button>
          </form>
          <Link href="/signup" legacyBehavior>
            <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
          </Link>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})
