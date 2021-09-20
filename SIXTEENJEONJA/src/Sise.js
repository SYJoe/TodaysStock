import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Sise() {
  const [sise, setSise] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchsise = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
        setSise(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get(
          'http://asp1.krx.co.kr/servlet/krx.asp.XMLSise?code=005930'
        );
        setSise(response.data); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchsise();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!sise) return null;
  return (
    <ul>
      {sise.map(sise => (
        <li>
          {sise.username} ({sise.name})
        </li>
      ))}
    </ul>
  );
}

export default Users;