
export function fetchData(url, setData) {
    // Assuming you have stored the authentication token in localStorage
    try {
      const token = localStorage.getItem('token');
    //   console.log("fetching token", token);
  
      fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include'
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
    catch (err) {
      console.error("Unable to get api");
    }
  }