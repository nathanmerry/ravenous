const apiKey =
  "zDYswQiKf6h0mKnR0aypdUgmfTnWE2dbI5fMYdF-sbQ76uyxY_w04rS8fbC9rk23wpA_ECxAR_GgoBzX8EB4TZvri__1P34Z7kFFqdIGnmwVBYkGg0d8yZXkTlKKXXYx";

const Yelp = {
  async search(term, location, sortBy) {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      }
    );

    const jsonResponse = await response.json();

    if (jsonResponse.businesses) {
      return jsonResponse.businesses.map(business => {
        return {
          id: business.id,
          imageSrc: business.image_url,
          name: business.name,
          address: business.location.address1,
          city: business.location.city,
          state: business.location.state,
          zipCode: business.location.zip_code,
          category: business.categories[0].title,
          rating: business.rating,
          reviewCount: business.review_count,
          latitude: business.coordinates.latitude,
          longitude: business.coordinates.longitude,
          url: business.url
        };
      });
    }
  },

  async search2(term, location, sortBy) {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      }
    );

    const jsonResponse = await response.json();

    let jsonResponse2 = {
      businesses: jsonResponse.businesses.map(business => {
        return {
          id: business.id,
          imageSrc: business.image_url,
          name: business.name,
          address: business.location.address1,
          city: business.location.city,
          state: business.location.state,
          zipCode: business.location.zip_code,
          category: business.categories[0].title,
          rating: business.rating,
          reviewCount: business.review_count,
          latitude: business.coordinates.latitude,
          longitude: business.coordinates.longitude,
          url: business.url
        };
      }),
      region: jsonResponse.region.center
    };

    return jsonResponse2;
  }
};

export default Yelp;
