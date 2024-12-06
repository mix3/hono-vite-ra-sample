import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { getRoleSet } from '../auth';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const roleSet = getRoleSet();

const App = () => {
  console.log(roleSet, roleSet.has('admin'), roleSet.has('visitor'));
  return (
    <Admin dataProvider={dataProvider}>
      {roleSet.has('visitor') && <Resource name="posts" list={ListGuesser} />}
      {roleSet.has('admin') && <Resource name="comments" list={ListGuesser} />}
    </Admin>
  );
};

export default App;
