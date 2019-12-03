import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';

import Loader from './components/common/Loader';
import Main from './components/Main';

import {UserContext} from './contexts';
import {firebaseService} from './services';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(function() {
    firebaseService.signIn().then(({user, error}) => {
      if (error) {
        Alert.alert('Something went wrong');
        return;
      }

      setUser(user);
    });
  }, []);

  if (!user) {
    return <Loader />;
  }

  return (
    <UserContext.Provider value={user}>
      <Main />
    </UserContext.Provider>
  );
}
