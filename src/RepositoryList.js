import React from 'react';
import Repository from './Repository';

export default function RepositoryList({ repositories }) {
  return (
    <div>
      {' '}
      {repositories.map((repo, index) => {
        return <Repository index={index + 1} repository={repo} />;
      })}{' '}
    </div>
  );
}
