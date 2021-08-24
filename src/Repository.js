import React from 'react';
import './Repository.css';

export default function Repository({ index, repository }) {
  console.log(repository.avatarUrl);
  return (
    <article className="Repository" key={index}>
      <header>#{index}</header>
      <div className="AvatarWrapper">
        <img className="Avatar" src={repository.avatarUrl} />
      </div>
      <footer>
        <div>{repository.name}</div>
        <div>@{repository.ownerName}</div>
        <div>{repository.stars} stars</div>
      </footer>
    </article>
  );
}
