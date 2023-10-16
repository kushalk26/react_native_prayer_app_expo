const makeApiRequest = async (url, method, data) => {
	
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    };

    const response = await fetch(url, options);
    const responseData = await response.json();
	
    if (!response.ok) {
      throw new Error(responseData.error || 'An error occurred.');
    }
	//console.log(responseData);
    return responseData;
  } catch (error) {
    throw error;
  }
};

export default makeApiRequest;
