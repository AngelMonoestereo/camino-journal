import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import Price from './Price'

import Rating from './Ratings'

const Book = ({ book }) => {

// Loading state - defaults to true (loading)

const [isLoading, setIsLoading] = useState(true)

// Track when the image has actually loaded

const [imageLoaded, setImageLoaded] = useState(false)


// Function to handle when image loads successfully

const handleImageLoaded = () => {

// Set the imageLoaded flag but don't hide skeleton yet

setImageLoaded(true)

}


// Function to handle image loading errors

const handleImageError = (e) => {

console.error('Failed to load image:', book.url)

// Prevent infinite error loops

e.target.onerror = null

// Set a placeholder image

e.target.src = 'https://placehold.co/200x300?text=No+Image'

// Mark as loaded even though it failed

setImageLoaded(true)

}


// Use effect to add delay after image loads

useEffect(() => {

let timer


if (imageLoaded) {

// Add a delay before hiding the skeleton

timer = setTimeout(() => {

setIsLoading(false)

}, 500) // 500ms delay - adjust as needed

}


// Cleanup timeout if component unmounts

return () => {

if (timer) clearTimeout(timer)

}

}, [imageLoaded])


return (

<div className="book">
{/* Always render the actual content, but keep it hidden until loaded */}
<div style={{ display: isLoading ? 'none' : 'block' }}>
<Link to=/books/${book.id}}>
<figure className="book__img--wrapper">

<img
src={book.url}
alt={book.title}
className="book__img"
onLoad={handleImageLoaded}
onError={handleImageError}
/>

</figure>
</Link>

<div className="book__title">
<Link to=/books/${book.id}} className="book__title--link">
{book.title}

</Link>

</div>
<Rating rating={book.rating} />
<Price
salePrice={book.salePrice}
originalPrice={book.originalPrice}
/>

</div>


{/* Show skeletons only while loading */}

{isLoading && (

<>

<div className="book__img--skeleton skeleton"></div>

<div className="skeleton book__title--skeleton"></div>

<div className="skeleton book__rating--skeleton"></div>

<div className="skeleton book__price--skeleton"></div>

</>

)}

</div>

)

}

export default Book




    return () => {
      mountedRef.current = false
    }
  }, [book.url])

  return (
    <div className="book">
      {img ? (
        <>
          <Link to={`/books/${book.id}`}>
            <figure className="book__img--wrapper">
              <img src={img.src} alt={book.title} className="book__img" />
            </figure>
          </Link>

          <div className="book__title">
            <Link to={`/books/${book.id}`} className="book__title--link">
              {book.title}
            </Link>
          </div>

          <Rating rating={book.rating} />
          <Price
            salePrice={book.salePrice}
            originalPrice={book.originalPrice}
          />
        </>
      ) : (
        <>
          <div className="book__img--skeleton skeleton"></div>
          <div className="skeleton book__title--skeleton"></div>
          <div className="skeleton book__rating--skeleton"></div>
          <div className="skeleton book__price--skeleton"></div>
        </>
      )}
    </div>
  )
}






