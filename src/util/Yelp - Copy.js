const apiKey =
  "zDYswQiKf6h0mKnR0aypdUgmfTnWE2dbI5fMYdF-sbQ76uyxY_w04rS8fbC9rk23wpA_ECxAR_GgoBzX8EB4TZvri__1P34Z7kFFqdIGnmwVBYkGg0d8yZXkTlKKXXYx";

// console.log('hello')

const Yelp = {
  async search(term, location, sortBy) {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });

    console.log(this.search)
    const jsonResponse = await response.json();
    if (jsonResponse.business) {
      return jsonResponse.business.map(business => {
        return{
          id: business.id,
          imageSrc: business.image_url,
          name: business.name,
          address: business.location.address1,
          city: business.location.city,
          state: business.location.state,
          zipCode: business.location.zip_code,
          category: business.categories[0].title,
          rating: business.rating,
          reviewCount: business.review_count
        };
      });
    }
  }
};

Yelp.search('pizza', 'london', 'best_match')

export default Yelp;
