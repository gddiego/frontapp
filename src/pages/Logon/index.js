import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import { FiLogIn } from 'react-icons/fi'

import herosImg from '../../assets/heroes.png';
import logoSvg from '../../assets/logo.svg';

import api from '../../services/api';

export default function Logon() {

    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (error) {
            alert('falha no login, tente novamente')
        }
    }
    return (
        <div className='logon-container'>
            <section className='form'>
                <img src={logoSvg} alt='Be The Hero' />
            </section>

            <form onSubmit={handleLogin}>
                <h1>Faça seu Logon</h1>

                <input placeholder='Sua ID'
                    value={id}
                    onChange={e => setId(e.target.value)}
                />
                <button className='button' type='submit'>Entrar</button>

                <Link className='back-link' to='/register'>
                    <FiLogIn size={16} color='#e02041' />
                    Não tenho cadastro.
                </Link>
            </form>

            <img src={herosImg} alt='Heroes' />
        </div>
    );
}