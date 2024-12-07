import type { NextPage } from 'next'
import { FormEvent, useState } from "react";

const Home: NextPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  // const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = {
      name,
      email,
      age: parseInt(age), // Parse age to an integer
    }

    const rawResponse = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });
    const content = await rawResponse.json();

    alert(content.message); // Show success message

    // Reset the form fields
    setName('');
    setEmail('');
    setAge('');
    // setMessage('');
  }

  return (
    <main className="bg-gray-100 min-h-screen">
      {/* <div className='bg-red-500 flex items-center justify-center'> */}
        <div className="max-w-5xl mx-auto py-16">
          <form className="py-4 space-y-4" onSubmit={handleSubmit}>
            <div className="flex items-center justify-center">
              <label htmlFor="name" className="sr-only">Name</label>
              <input value={name} onChange={e => setName(e.target.value)} type="text" name="name" id="name" className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-64 sm:text-md border-gray-300 rounded-md" placeholder="Your Name" />
            </div>
            <div className="flex items-center justify-center">
              <label htmlFor="email" className="sr-only">Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" name="email" id="email" className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-64 sm:text-md border-gray-300 rounded-md" placeholder="Your Email" />
            </div>
            <div className="flex items-center justify-center">
              <label htmlFor="age" className="sr-only">Age</label>
              <input value={age} onChange={e => setAge(e.target.value)} type="number" name="age" id="age" className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-64 sm:text-md border-gray-300 rounded-md" placeholder="Your Age" />
            </div>
            <div className="flex items-center justify-center">
              <button type="submit" className="flex items-center justify-center text-sm w-64 rounded-md shadow py-3 px-2 text-white bg-indigo-600">Submit</button>
            </div>
          </form>
        </div>
      {/* </div> */}

    </main>
  )
}

export default Home
