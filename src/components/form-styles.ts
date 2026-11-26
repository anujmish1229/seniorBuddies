// Shared classes for the Contact and Join forms. Input borders use ink-soft so
// they meet the 3:1 non-text contrast requirement.
export const labelClass = "mb-2 block font-bold";
export const inputClass =
  "w-full rounded-md border-2 border-ink-soft bg-white px-4 py-3 text-ink placeholder:text-ink-soft/80 focus:border-link";
export const statusClass = {
  success: "mb-8 border-l-4 border-success bg-white p-4 text-success",
  error: "mb-8 border-l-4 border-error bg-white p-4 text-error",
};
