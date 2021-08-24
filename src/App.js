import React, { useState, useEffect } from 'react';
import './style.css';
import RepositoryList from './RepositoryList';

const URL =
  'https://api.github.com/search/repositories?q=stars:%3E10000&sort=stars';
export default function App() {
  const [repositories, setRepositories] = useState([]);
  const [reposForDisplay, setReposForDisplay] = useState([]);
  const [languageFilters, setLanguageFilters] = useState([]);
  const [activeFilter, setActiveFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(URL);
      const repos = await response.json();
      console.log(repos);
      const languages = new Map();
      const repoSummaries = (repos.items || []).map(r => {
        const language = r.language || 'No Language';
        languages.set(language, language);
        return {
          name: r.name,
          ownerName: r.owner.login,
          avatarUrl: r.owner.avatar_url,
          stars: r.stargazers_count,
          language: language
        };
      });
      setRepositories(repoSummaries);
      setLanguageFilters([
        'All',
        ...Array.from(languages.values()).filter(Boolean)
      ]);
      setActiveFilter('All');
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filteredRepositories =
      activeFilter === 'All'
        ? repositories
        : repositories.filter(repo => repo.language === activeFilter);
    setReposForDisplay(filteredRepositories);
  }, [activeFilter, repositories]);

  return (
    <div className="App">
      <header className="Header">
        {languageFilters.map((filter, index) => {
          return (
            <span key={index} onClick={() => setActiveFilter(filter)}>
              {filter}
            </span>
          );
        })}
      </header>
      <section className="Content">
        <RepositoryList repositories={reposForDisplay} />{' '}
      </section>
    </div>
  );
}
