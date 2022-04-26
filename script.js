import http from 'k6/http';
import { sleep } from 'k6';

// const db = sql.open('postgres', 'mydb');

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  http.get('http://localhost:3000');
  sleep(1);
}