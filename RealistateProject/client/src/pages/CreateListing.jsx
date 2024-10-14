// import React from 'react'

function CreateListing() {
  return (
    <main>
        <h1 className="text-3xl font-semibold text-center my-7">create a listing</h1>
        <form className="flex flex-col sm:flex-row">
            <div className="">
                <input type="text" placeholder="Name" className="border p-3 rounded-lg"/>
            </div>

        </form>
    </main>
  )
}

export default CreateListing