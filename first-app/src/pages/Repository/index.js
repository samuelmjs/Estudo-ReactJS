/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssueList, IssueFilter, PageActions } from './styles';

function Repository({ match }) {
  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState([
    { state: 'all', label: 'Todas', active: true },
    { state: 'open', label: 'Abertas', active: false },
    { state: 'closed', label: 'Fechadas', active: false },
  ]);
  const [filterIndex, setFilterIndex] = useState(0);
  const [page, setPage] = useState(1);

  async function repositoryData() {
    const repoName = decodeURIComponent(match.params.repository);

    const [getRepository, getIssues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    setRepository(getRepository.data);
    setIssues(getIssues.data);
    setLoading(false);
  }

  async function loadIssues() {
    const repoName = decodeURIComponent(match.params.repository);

    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filters[filterIndex].state,
        per_page: 5,
        page,
      },
    });

    setIssues(response.data);
  }

  useEffect(() => {
    repositoryData();
  }, []);

  function handleFilterClick(index) {
    setFilterIndex(index);
    loadIssues();
  }

  async function handlePage(action) {
    await setPage(action === 'back' ? page - 1 : page + 1);

    loadIssues();
  }

  if (loading) {
    return <Loading>Carregando...</Loading>;
  }

  return (
    <Container>
      <Owner>
        <Link to="/">Voltar aos repositórios</Link>
        <img src={repository.owner.avatar_url} alt={repository.owner.login} />
        <h1>{repository.name}</h1>
        <p>{repository.description}</p>
      </Owner>

      <IssueList>
        <IssueFilter active={filterIndex}>
          {filters.map((filter, index) => (
            <button
              type="button"
              key={filter.label}
              onClick={() => handleFilterClick(index)}
            >
              {filter.label}
            </button>
          ))}
        </IssueFilter>
        {issues.map(issue => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />
            <div>
              <strong>
                <a href={issue.html_url}>{issue.title}</a>
                {issue.labels.map(label => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}
              </strong>
              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssueList>

      <PageActions>
        <button
          type="button"
          disabled={page < 2}
          onClick={() => handlePage('back')}
        >
          Anterior
        </button>
        <span>Página {page}</span>
        <button type="button" onClick={() => handlePage('next')}>
          Próximo
        </button>
      </PageActions>
    </Container>
  );
}

Repository.prototype = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};

export default Repository;
