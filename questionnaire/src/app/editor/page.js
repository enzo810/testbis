"use client"

import supabase from '@/config/supabase';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons';

export default function adminForm() {
  const {register, handleSubmit} = useForm();

  const update = async (data) => {
    try {
      await supabase.from("custom").update(data).eq("id", 1);
      alert("Les modifications ont bien été appliquées.")
    } catch (error) {
      console.log(error.message);
    }
  }

  const uploadImage = async (e) => {
    try {
      e.preventDefault();
      const form = new FormData(e.target);
      if(form.get("image").name){
        await supabase.storage.from("images").upload("public/" + form.get("image").name, form.get("image"), {upsert: true});
        updateUrl(form.get("image").name);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  
  const updateUrl = async (name) => {
    try {
      const response = supabase.storage.from('images').getPublicUrl('public/' + name);
      await supabase.from("image").update({url : response.data.publicUrl}).eq("id", 1);
      alert("La modification a bien été appliquée.");
    } catch (error){
      console.log(error);
    }
  }

    return (
      <main> 
        <div className='mx-auto container border border-gray-300 rounded bg-white p-4 mb-2'>
          <form onSubmit={(e) => {uploadImage(e)}}>
              <label className='font-semibold' htmlFor='image'>Changer l'image du questionnaire :</label>&nbsp;&nbsp;
              <input type="file" name="image" id='image' accept="image/jpeg"/>
              <div className='flex justify-end'>
                <button className='font-light py-2 px-4 rounded border border-gray-100'>Modifier&nbsp;&nbsp;<FontAwesomeIcon icon={faSquareArrowUpRight}/></button>
              </div>
          </form>
        </div> 
        <div className='mx-auto container border border-gray-300 rounded bg-white p-4'>
          <form onSubmit={handleSubmit(update)}>
            <div className="mb-10">
              <label className='font-semibold' htmlFor='title'>Titre du questionnaire :</label>
              <input className="rounded border-2 border-gray-200 w-full" type="text" id='title' name="title" {...register("title")} defaultValue="Pour en apprendre plus sur vous :"/>
            </div>

            <div className="mb-10">
              <label className='font-semibold' htmlFor='description'>Description du questionnaire :</label>
              <input className="rounded border-2 border-gray-200 w-full" type="text" id='description' name="description" {...register("description")} defaultValue="Les informations que vous nous communiquez resterons confidentielles"/>
            </div>

            <div className="mb-10 flex">
              <label className='font-semibold' htmlFor='city'>Afficher la question "Nom et Prénom" :</label>&nbsp;&nbsp;
              <select className="rounded border-2 border-gray-200" id='city' name ="city" {...register("names")}>
                <option value="true">Activé</option>
                <option value="false">Désactivé</option>
              </select>
            </div>

            <div className="mb-10">
              <label className='font-semibold' htmlFor='age'>Afficher la question "Age" :</label>&nbsp;&nbsp;
              <select className="rounded border-2 border-gray-200" id='age' name ="age" {...register("age")}>
                <option value="true">Activé</option>
                <option value="false">Désactivé</option>
              </select>
            </div>

            <div className="mb-10">
              <label className='font-semibold' htmlFor='gender' >Afficher la question "Genre" :</label>&nbsp;&nbsp;
              <select className="rounded border-2 border-gray-200" id='gender' name ="gender" {...register("gender")}>
                <option value="true">Activé</option>
                <option value="false">Désactivé</option>
              </select>
            </div>

            <div className="mb-10">
              <label className='font-semibold' htmlFor='city'>Afficher la question "Ville" :</label>&nbsp;&nbsp;
              <select className="rounded border-2 border-gray-200" id='city' name ="city" {...register("city")}>
                <option value="true">Activé</option>
                <option value="false">Désactivé</option>
              </select>
            </div>

            <div className="mb-10">
              <label className='font-semibold' htmlFor='situation'>Afficher les questions "Situation", "Emploi" :</label>&nbsp;&nbsp;
              <select className="rounded border-2 border-gray-200" id='situation' name ="situation" {...register("situation")}>
                <option value="true">Activé</option>
                <option value="false">Désactivé</option>
              </select>
            </div>

            <div className="mb-10">
              <label className='font-semibold' htmlFor='email'>Afficher la question "Email" :</label>&nbsp;&nbsp;
              <select className="rounded border-2 border-gray-200" id='email' name ="email" {...register("email")}>
                <option value="true">Activé</option>
                <option value="false">Désactivé</option>
              </select>
            </div>

            <div className="mb-7">
              <label className='font-semibold' htmlFor='opinion'>Afficher la question "Avis" :</label>&nbsp;&nbsp;
              <select className="rounded border-2 border-gray-200" id='opinion' name ="opinion" {...register("opinion")}>
                <option value="true">Activé</option>
                <option value="false">Désactivé</option>
              </select>
            </div>

            <div className='flex justify-end'>
              <button className='font-light py-2 px-4 rounded border border-gray-100'>Modifier&nbsp;&nbsp;<FontAwesomeIcon icon={faSquareArrowUpRight}/></button> 
            </div>
          </form>
        </div>
      </main>
    );
  }
  