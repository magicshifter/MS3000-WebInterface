import React from 'react';
import { Link } from 'react-router';

export class NotFoundView extends React.Component {
  render() {
    return (
      <div className='container text-center'>
        <h1>This is a 404 page!</h1>
        <div>Seems like whatever you where looking for can not be found</div>
        <hr />
        <Link to='/'>Back To Start</Link>
      </div>
    );
  }
}

export default NotFoundView;
