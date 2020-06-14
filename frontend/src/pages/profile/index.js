import React from 'react';

import Menu from '../../components/Menu';
import PasswordForm from './forms/password';
import PersonalForm from './forms/personal';

export default function Profile() {

    return (
      <div className="container">
        <div className="row">
          <Menu />
          <div className="col-md-8">
                <PersonalForm />
                <PasswordForm />
            </div>
        </div>
    </div>
    )
}