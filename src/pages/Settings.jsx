import React, { useState } from "react";
import { LockKeyhole, UserRound, Phone, ChevronRight, ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux"; 
import SecurityVerification from "../components/SecurityVerification";
import Changepassword from "../components/Changepassword";
import ChangeUsername from "../components/ChangeUsername";
import ChangePhoneNumber from "../components/ChangePhoneNumber";

const Settings = () => {
  const [activeSetting, setActiveSetting] = useState(null);
  const [verified, setVerified] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const settings = [
    {
      id: "username",
      title: "Change Username",
      description: "Update the name used for your account",
      icon: UserRound,
    },
    {
      id: "phone",
      title: "Change Phone Number",
      description: "Update your registered phone number",
      icon: Phone,
    },
    {
      id: "password",
      title: "Change Password",
      description: "Create a new password for your account",
      icon: LockKeyhole,
    },
  ];

// User clicks one of the settings 
function handleSettingClick(settingId)
 { 
  setActiveSetting(settingId); 
  setVerified(false); 
}; 
// Return to settings list 
function handleBack() 
{ 
  setActiveSetting(null); 
  setVerified(false); 
}; // If no user is available 
if (!user) 
  { 
    return ( 
    <div className="p-8 text-center text-red-600"> 
    User information not found. 
    </div> 
    ); }
//SECURITY VERIFICATION SCREEN
    if (activeSetting && !verified) 
      { 
        return ( <div className="min-h-screen bg-purple-50 px-4 py-8 md:px-8"> 
        <div className="mx-auto max-w-4xl"> 
          <button onClick={handleBack} className="mb-6 flex items-center gap-2 text-purple-700 hover:text-purple-900" > 
            <ArrowLeft size={20} /> Back to Settings </button>
             <SecurityVerification user={user[0]} onVerified={() => setVerified(true)} onCancel={handleBack} /> 
              </div>
               </div> ); }
//Change Password Page
if (activeSetting === "password" && verified) {
  return (
    <div className="min-h-screen bg-purple-50 px-4 py-8 md:px-8">

      <div className="mx-auto max-w-4xl">

        <Changepassword
          user={user[0]}
          onBack={handleBack}
        />

      </div>

    </div>
  );
}

if (activeSetting === "username" && verified) {
  return (
    <div className="min-h-screen bg-purple-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-4xl">

        <button
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 text-purple-700 hover:text-purple-900"
        >
          <ArrowLeft size={20} />
          Back to Settings
        </button>

        <ChangeUsername
          user={user[0]}
          onBack={handleBack}
        />

      </div>
    </div>
  );
}

if (activeSetting === "phone" && verified) {
  return (
    <div className="min-h-screen bg-purple-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-4xl">

        <button
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 text-purple-700 hover:text-purple-900"
        >
          <ArrowLeft size={20} />
          Back to Settings
        </button>

        <ChangePhoneNumber
          user={user[0]}
          onBack={handleBack}
        />

      </div>
    </div>
  );
}
//AFTER SECURITY VERIFICATION
if (activeSetting && verified) 
  { return (
     <div className="min-h-screen bg-purple-50 px-4 py-8 md:px-8">
       <div className="mx-auto max-w-4xl">
         <button onClick={handleBack} className="mb-6 flex items-center gap-2 text-purple-700 hover:text-purple-900" > 
          <ArrowLeft size={20} /> Back to Settings </button> 
          <div className="rounded-2xl bg-white p-8 shadow-md">
             <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
               ✓ 
              </div>
               <h1 className="text-2xl font-bold text-purple-900"> Security Verified </h1> 
               <p className="mt-2 text-gray-600"> Your identity has been successfully verified. </p> 
               <p className="mt-4 text-sm text-gray-500"> You can now change your{" "}
                 <span className="font-semibold">
                   {activeSetting === "username" ? "username" : activeSetting === "phone" ? "phone number" : "password"}
                    </span>
                     </p> 
                     </div>
                      </div>
                       </div> 
                       ); }






   //Main settings                    

  return (
    <div className="min-h-screen bg-purple-50 px-4 py-8 md:px-8">

      <div className="mx-auto max-w-4xl">

        <h1 className="text-3xl font-bold text-purple-900">
          Settings
        </h1>

        <p className="mt-2 text-gray-600">
          Manage your account and security preferences.
        </p>

        <div className="mt-8 space-y-4">

          {settings.map((setting) => {
            const Icon = setting.icon;

            return (
              <button
                key={setting.id}
                onClick={() => handleSettingClick(setting.id)}
                className="flex w-full items-center gap-4 rounded-2xl
                           bg-white p-5 text-left shadow-sm
                           transition hover:shadow-md hover:bg-purple-50"
              >

                <div className="flex h-12 w-12 items-center justify-center
                                rounded-full bg-purple-100 text-purple-700">
                  <Icon size={22} />
                </div>

                <div className="flex-1">
                  <h2 className="font-semibold text-gray-800">
                    {setting.title}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {setting.description}
                  </p>
                </div>

                <ChevronRight
                  className="text-purple-400"
                  size={22}
                />

              </button>
            );
          })}

        </div>

      </div>

    </div>
  );
};

export default Settings;