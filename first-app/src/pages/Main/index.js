/* eslint-disable no-throw-literal */
import React, { useState, useEffect } from 'react';
import { FaGithub, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List, Error } from './styles';

export default function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [repositoryInvalid, setRepositoryInvalid] = useState(null);
  const [error, setError] = useState(null);

  // Load LocalStorage data
  useEffect(() => {
    const getRepositories = localStorage.getItem('repositories');

    if (getRepositories) {
      setRepositories(JSON.parse(getRepositories));
    }
  }, []);

  // Save in LocalStorage data
  useEffect(() => {
    localStorage.setItem('repositories', JSON.stringify(repositories));
  }, [repositories]);

  function handleInputChange(e) {
    setNewRepo(e.target.value);
    setError(null);
    setRepositoryInvalid(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setRepositoryInvalid(false);
    setLoading(true);

    try {
      if (!newRepo.trim()) throw 'Você precisa indicar um repositório';

      const response = await api.get(`/repos/${newRepo}`);

      const hasRepo = repositories.find(r => r.name === newRepo);

      if (hasRepo) throw 'Repositório duplicado';

      const data = {
        name: response.data.full_name,
      };

      setRepositories([...repositories, data]);
      setNewRepo('');
    } catch (erro) {
      if (String(erro) === 'Error: Request failed with status code 404') {
        setError('Repositório não encontrado');
      } else {
        setError(String(erro));
      }

      setRepositoryInvalid(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <h1>
        <FaGithub />
        Repositórios
      </h1>

      <Form onSubmit={handleSubmit} error={repositoryInvalid}>
        <input
          type="text"
          placeholder="Adicionar repositório"
          value={newRepo}
          onChange={handleInputChange}
        />

        <SubmitButton loading={loading}>
          {loading ? (
            <FaSpinner color="#fff" size={14} />
          ) : (
            <FaPlus color="#fff" size={14} />
          )}
        </SubmitButton>
      </Form>

      {repositoryInvalid && (
        <Error>
          <p>{error && error}</p>
        </Error>
      )}

      <List>
        {repositories.map(repository => (
          <li key={repository.name}>
            <span>{repository.name}</span>
            <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
              Detalhes
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}
