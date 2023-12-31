import {useState, FormEvent, useContext} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.scss'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { AuthContext } from '@/contexts/AuthContext'
import Link from 'next/link'
import { toast } from 'react-toastify';

import logoImg from '../../../public/pizzapro-logo.png'

export default function SignUp() {
const { signUp } = useContext(AuthContext);

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();
    if (name === '' || email === '' || password === ''){
      toast.error('Por favor, preencha todos os campos')
      return;
    }
    setLoading(true);
    
    let data = {
      name, email, password
    }
    await signUp(data)

    setLoading(false);
  }
  return (
    <>
      <Head>
        <title>PizzaPro - Faça seu cadastro</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt='Logo PizzaPro' width={350} />
        <div className={styles.login}>
        <h1>Crie sua conta</h1>
          <form onSubmit={handleSignUp}>
            <Input value={name} onChange={(e)=>setName(e.target.value)} placeholder='Digite seu nome' type='text' />
            <Input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Digite seu email' type='text' />
            <Input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Digite sua senha' type='password' />
            <Button type="submit" loading={loading}>Cadastrar</Button>
          </form>
          <Link href="/" legacyBehavior>
            <a className={styles.text}>Já possui uma conta? Faça login!</a>
          </Link>
        </div>
      </div>
    </>
  )
}
