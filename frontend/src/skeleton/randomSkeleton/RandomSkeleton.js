import CardSkeleton from '../cardSkeleton/CardSkeleton'

const RandomSkeleton = () => {
  const skeletonData = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description for Product 1',
      price: 25,
      category_id: 58,
      main_image_link:
        'https://user-images.githubusercontent.com/20684618/31289519-9ebdbe1a-aae6-11e7-8f82-bf794fdd9d1a.png',
      taginfo: [
        {
          name: 'Default Tag',
          id: 49,
        },
      ],
      category_name: 'Default cat',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description for Product 2',
      price: 25,
      category_id: 58,
      main_image_link:
        'https://user-images.githubusercontent.com/20684618/31289519-9ebdbe1a-aae6-11e7-8f82-bf794fdd9d1a.png',
      taginfo: [
        {
          name: 'Default Tag',
          id: 49,
        },
      ],
      category_name: 'Default cat',
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Description for Product 3',
      price: 30,
      category_id: 59,
      main_image_link:
        'http://localhost:3000/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBclFDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f598273679827c824d960bae32bd0b1dd0bce617/test3.jpg',
      taginfo: [
        {
          name: 'Default Tag',
          id: 50,
        },
      ],
      category_name: 'Default cat',
    },
    {
      id: 4,
      name: 'Product 4',
      description: 'Description for Product 4',
      price: 25,
      category_id: 58,
      main_image_link:
        'https://user-images.githubusercontent.com/20684618/31289519-9ebdbe1a-aae6-11e7-8f82-bf794fdd9d1a.png',
      taginfo: [
        {
          name: 'Default Tag',
          id: 49,
        },
      ],
      category_name: 'Default cat',
    },
  ]
  return (
    <>
      {skeletonData?.map((data) => (
        <CardSkeleton skeletonData={data} key={data.id} />
      ))}
    </>
  )
}
export default RandomSkeleton
