// SAFE SUPABASE INIT (never redeclares)

var supabaseClient;

if (!window.supabaseClient) {
  window.supabaseClient = window.supabase.createClient(
    "https://rairwoyaesgvezxyztnq.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhaXJ3b3lhZXNndmV6eHl6dG5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1NTIwODcsImV4cCI6MjA3NzEyODA4N30.1TxIpecWR2YoP_6wz-Ifs3VWWfuhLND5ob3pLYzJM_g"
  );
}

supabaseClient = window.supabaseClient;


// anonymous login
async function login(){
  await supabaseClient.auth.signInAnonymously();
}


// load slots
async function loadSlots(){

  const { data, error } = await supabaseClient
    .from("time_slots")
    .select("*")
    .eq("status","available");

  if(error){
    console.log(error);
    return;
  }

  const div=document.getElementById("slots");
  div.innerHTML="";

  data.forEach(()=>{
    const btn=document.createElement("button");
    btn.innerText="Start Session";
    btn.onclick=startCall;
    div.appendChild(btn);
  });
}


function startCall(){
  localStorage.setItem("room","talko_test_room");
  window.location.href="call.html";
}


login().then(loadSlots);

