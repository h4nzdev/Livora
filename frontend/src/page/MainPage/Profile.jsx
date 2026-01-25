import React, { useState } from "react";

const Profile = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-[#101819] dark:text-white transition-colors duration-200">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 -mx-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="text-[#101819] dark:text-white flex size-12 shrink-0 items-center">
              <span className="material-symbols-outlined text-2xl">
                settings
              </span>
            </div>
            <h2 className="text-[#101819] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
              Profile
            </h2>
            <div className="flex w-12 items-center justify-end">
              <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-[#101819] dark:text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
                <span className="material-symbols-outlined text-2xl">
                  edit_square
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Profile Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div
                className="rounded-full p-1 shadow-lg"
                style={{
                  background: "conic-gradient(#22c55e 95%, transparent 0)",
                }}
              >
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32 border-4 border-white dark:border-zinc-800"
                  alt="Professional portrait of a Filipino user"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA_pgElr8j_rlRwwpwegIL6Xuu4ezz6xE_6E1sL8l_12yVtQzhizRxzdBuXKzxqzZtWedaKiW9a_rBwyN3hgVIcYMUogSkMC-PzA4tnScc8Em0e1jbPoHp1-PVUSkRNQh2qywoUUKaf2_sHhQgYC-MbdOLhdCTWIWjsxJde9pTF29mUt5EnSAWSeFt2vIEi4T6z9GP19gG0dvXkdi650EgHOBsJd6W9BhNm52Ja4gTZGd8V2d0HAJF51IQaM2kqH-OA3ubEuyskyU8")',
                  }}
                />
              </div>
              <div className="absolute bottom-0 right-0 flex gap-1">
                <div className="bg-satisfaction text-white p-1.5 rounded-full border-2 border-white dark:border-zinc-800 flex items-center justify-center shadow-sm">
                  <span
                    className="material-symbols-outlined text-xs font-bold"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    sentiment_satisfied
                  </span>
                </div>
                <div className="bg-primary text-white p-1.5 rounded-full border-2 border-white dark:border-zinc-800 flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-xs font-bold">
                    verified
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-2">
                <p className="text-[#101819] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">
                  Juan Dela Cruz
                </p>
                <span className="text-satisfaction text-sm font-bold bg-satisfaction/10 px-2 py-0.5 rounded-full">
                  95%
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-primary text-sm font-semibold">
                  Verified Resident
                </span>
              </div>
              <p className="text-[#57858e] dark:text-[#a0bfc6] text-sm font-normal leading-normal text-center">
                Member since Jan 2024
              </p>
            </div>
          </div>
          <button className="mt-4 flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
            <span className="truncate">Upgrade to Premium</span>
          </button>
        </div>

        {/* Match Profile Section */}
        <div className="mb-8">
          <h3 className="text-[#101819] dark:text-white text-xs font-bold leading-tight tracking-[0.1em] mb-2 uppercase opacity-60">
            My Match Profile
          </h3>
          <div className="flex flex-col gap-3 rounded-xl bg-white dark:bg-zinc-900 p-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-black/5 dark:border-white/5">
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 dark:bg-primary/20 rounded-full border border-primary/20">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  payments
                </span>
                <span className="text-[#101819] dark:text-white text-xs font-medium">
                  ₱25k - ₱45k
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 dark:bg-primary/20 rounded-full border border-primary/20">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  location_on
                </span>
                <span className="text-[#101819] dark:text-white text-xs font-medium">
                  BGC & Makati
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 dark:bg-primary/20 rounded-full border border-primary/20">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  pets
                </span>
                <span className="text-[#101819] dark:text-white text-xs font-medium">
                  Pet-friendly
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 dark:bg-primary/20 rounded-full border border-primary/20">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  train
                </span>
                <span className="text-[#101819] dark:text-white text-xs font-medium">
                  Near MRT/LRT
                </span>
              </div>
            </div>
            <div className="h-[1px] bg-black/5 dark:bg-white/5 w-full" />
            <button className="flex items-center justify-center gap-2 w-full text-primary font-bold text-sm py-1 hover:text-primary/80 transition-colors">
              <span className="material-symbols-outlined text-[18px]">
                edit_note
              </span>
              Update Preferences
            </button>
          </div>
        </div>

        {/* Account & Security Section */}
        <div className="mb-8">
          <h3 className="text-[#101819] dark:text-white text-xs font-bold leading-tight tracking-[0.1em] mb-2 uppercase opacity-60">
            Account & Security
          </h3>
          <div className="flex flex-col overflow-hidden rounded-xl bg-white dark:bg-zinc-900 shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-black/5 dark:border-white/5">
            <button className="flex items-center justify-between p-4 border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400">
                    badge
                  </span>
                </div>
                <div className="flex flex-col">
                  <p className="text-[#101819] dark:text-white text-sm font-bold">
                    Identity Verification
                  </p>
                  <p className="text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                    Fully Verified (PH ID)
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-zinc-400">
                chevron_right
              </span>
            </button>
            <button className="flex items-center justify-between p-4 border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
                  <span className="material-symbols-outlined text-primary">
                    stars
                  </span>
                </div>
                <div className="flex flex-col">
                  <p className="text-[#101819] dark:text-white text-sm font-bold">
                    Subscription Plan
                  </p>
                  <p className="text-[#57858e] dark:text-[#a0bfc6] text-xs font-medium">
                    Standard Free
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-zinc-400">
                chevron_right
              </span>
            </button>
            <div className="flex items-center justify-between p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <span className="material-symbols-outlined text-amber-600 dark:text-amber-400">
                    notifications_active
                  </span>
                </div>
                <div className="flex flex-col">
                  <p className="text-[#101819] dark:text-white text-sm font-bold">
                    Push Notifications
                  </p>
                  <p className="text-[#57858e] dark:text-[#a0bfc6] text-xs font-medium">
                    Enabled
                  </p>
                </div>
              </div>
              <div className="relative inline-flex items-center cursor-pointer">
                <input
                  className="sr-only peer"
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  id="notifications-toggle"
                />
                <label
                  htmlFor="notifications-toggle"
                  className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-primary cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="flex flex-col items-center gap-4 pt-8 border-t border-black/10 dark:border-white/10">
          <button className="text-rose-500 font-bold text-base hover:text-rose-600 transition-colors">
            Log Out
          </button>
          <p className="text-[#57858e] dark:text-[#a0bfc6] text-[10px] font-medium tracking-widest opacity-40 uppercase">
            App Version 2.4.0 (2024)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
