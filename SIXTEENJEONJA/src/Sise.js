import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Sise() {
  const [sise, setSise] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchsise = async () => {
      try {
        setError(null);
        setSise(null);
        setLoading(true);
        const response = await axios.get(
          'https://finance.naver.com/item/main.nhn?code=005930'
        );
        setSise(response.data);
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
	console.log(response.data);
  return (
	  response.data
  );
}

export default Sise;