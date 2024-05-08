"use client"

import supabase from '@/config/supabase';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons';


export default function Form() {
  const {register, handleSubmit, errors} = useForm();
  const [job, setJob] = useState();
  const [custom, setCustom] = useState();
  const [imageUrl, setImageUrl] = useState();

  const fetch = async () => {
    try {
        const { data, error } = await supabase.from('custom').select().eq("id", 1);
        setCustom(data[0]);
    } catch (error) {
        console.log("Une erreur s'est produite :", error.message);
    }
  }

  const fetchUrl = async () => {
    try {
      const { data, error } = await supabase.from('image').select("url").eq("id", 1);
      setImageUrl(data[0].url);
    } catch (error) {
      console.log(error.message);
    }
  }

  const insert = async (data) => {
    try {
      await supabase.from("answers").insert(data);
      alert("Vos réponses ont bien été envoyées.");
    } catch (error) {
      console.log(error.message);
    }
  }

  const defineJob = (e) => {
    setJob(e.target.value);
  }

  useEffect(() => {
    fetch();
    fetchUrl();
  }, [])
  return (
    <main>
      <div className="mx-auto container border border-gray-300 rounded bg-white">
        <div className='p-8'>
        {imageUrl && imageUrl != "" &&
          <img className=" rounded-md mb-10" src={imageUrl}></img>
        }
        <div className='mb-10'>
          {custom && custom.title != "" &&
            <h1>{custom.title}</h1>
          }
          {custom && custom.description != "" &&
            <p>{custom.description}</p>
          }
        </div>
        <form onSubmit={handleSubmit(insert)}>
          {custom && custom.names === true && 
            <div className='mb-10'>
              <h1>Nom et Prénom :</h1>
              <p>Veuillez saisir votre nom puis votre prénom, si vous avez des prénoms secondaires, n'hésitez pas à les ajouter à la suite</p>
              <input className="rounded border-2 border-gray-200 w-full" type="text" name="names" {...register("names", {required: true})}></input>
            </div>
          }
        
          {custom && custom.age === true && 
            <div className='mb-10'>
              <h1>Âge :</h1>
              <p>Renseignez votre âge nous aidera à personnaliser votre expérience</p>
              <input className="rounded border-2 border-gray-200 w-full" type="int" name="age" {...register("age", {required: true})}></input>
            </div>
          }

          {custom && custom.gender === true && 
            <div className='mb-10'>
              <h1>Genre :</h1>
              <p className='sm:hidden'>Précisez votre genre :</p>
              <div className="flex justify-between">
              <p className='max-sm:hidden'>Précisez votre genre :</p>
                <div>
                  <label htmlFor='men'>Homme</label>&nbsp;
                  <input type="radio" name="gender" id='men' value="homme" {...register("gender")} className="mr-2"/>
                 </div>
                <div>
                  <label htmlFor='women'>Femme</label>&nbsp;
                  <input type="radio" name="gender" id="women" value="femme" {...register("gender")} className="mr-2"/>
                </div>
                <div>
                  <label htmlFor='other'>Autre</label>&nbsp;
                  <input type="radio" name="gender" id='other' value="autre" {...register("gender")} className="mr-2"/>
                </div>
              </div>
            </div>
          }

          {custom && custom.city === true && 
            <div className='mb-10'>
              <h1>Ville :</h1>
              <p>Si votre ville ne figure pas sur la liste, veuillez sélectionner la plus proche</p>
                <select className="rounded border-2 border-gray-200 w-full" name ="city" {...register("city", {required: true})}>
                    <option value="Paris">Paris</option>
                    <option value="Marseille">Marseille</option>
                    <option value="Lyon">Lyon</option>
                    <option value="Toulouse">Toulouse</option>
                    <option value="Nice">Nice</option>
                    <option value="Nantes">Nantes</option>
                    <option value="Montpellier">Montpellier</option>
                    <option value="Strasbourg">Strasbourg</option>
                    <option value="Bordeaux">Bordeaux</option>
                    <option value="Lille">Lille</option>
                </select>
            </div>
          }
 
          {custom && custom.situation === true &&
            <div>
              <div className='mb-10'>
                <h1>Situation :</h1>
                <p className='sm:hidden'>Occupez-vous actuellement un emploi ? : </p>
                <div className='flex justify-between max-sm:justify-center max-sm:gap-20'>
                  <p className='max-sm:hidden'>Occupez-vous actuellement un emploi ? : </p>
                  <div>
                    <label htmlFor='yes' >Oui</label>&nbsp;
                    <input type="radio" name="jobRadio" id='yes' value="yes" onChange={defineJob}/>&nbsp;&nbsp;
                  </div>
                  <div>
                    <label htmlFor='no'>Non</label>&nbsp;
                    <input type="radio" name="jobRadio" id='no' value="no" onChange={defineJob}/>&nbsp;&nbsp;
                  </div>
                </div>
              </div>
            

              {job === "yes" && 
                <div className='mb-10'>
                  <h1>Emploi :</h1>
                  <p>Cette information permettra d'affiner nos statistiques</p>
                  <input className="rounded border-2 border-gray-200 w-full" type="text" name="jobText" {...register("job")}></input>
                </div>
              }
            </div>
          }

          {custom && custom.email === true && 
            <div className='mb-10'>
              <h1>Email :</h1>
              <p>Afin de vous tenir au courant de notre actualité</p>
              <input className="rounded border-2 border-gray-200 w-full" type="email" name="email" {...register("email", {required: true})}></input>
            </div>
          }

          {custom && custom.opinion === true && 
            <div className='mb-10'>
              <h1>Avis :</h1>
              <p>Avez-vous des suggestions ou des idées pour améliorer nos services ?</p>
              <textarea className="rounded border-2 border-gray-200 w-full" name="opinion" {...register("opinion")}></textarea>
            </div>
          }

            <div className='flex justify-end'>
              <button className='max-sm:hidden font-light py-2 px-4 rounded border border-gray-100'>Envoyer vos réponses&nbsp;&nbsp;<FontAwesomeIcon icon={faSquareArrowUpRight} /></button>
              <button className='sm:hidden font-light py-2 px-4 rounded border border-gray-100'>Envoyer&nbsp;&nbsp;<FontAwesomeIcon icon={faSquareArrowUpRight}/></button>
            </div>
        </form>
        </div>
      </div>
    </main>
  );
}
