import React from "react";

const AddressInput = ({ addressProps, setAddressProps, disabled }) => {
  const { phone, city, code, address, country } = addressProps;
  return (
    <>
      <div className="flex-col gap-1 flex">
        <label>Phone Number</label>
        <input
          disabled={disabled}
          type="tel"
          placeholder="Phone Number"
          className="rounded-[15px] w-[250px] border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-3 text-black"
          value={phone}
          onChange={(e) => setAddressProps("phone", e.target.value)}
        />
      </div>
      <div className="flex-col gap-2 flex">
        <label>Country</label>
        <input
          disabled={disabled}
          type="text"
          placeholder="Country"
          className="rounded-[15px] w-[250px] border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-3 text-black"
          value={country}
          onChange={(e) => setAddressProps("country", e.target.value)}
        />
      </div>
      <div className="flex-col gap-2 flex">
        <label>Street Address</label>
        <input
          disabled={disabled}
          type="text"
          placeholder="Street address"
          className="rounded-[15px] w-[250px] border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-3 text-black"
          value={address}
          onChange={(e) => setAddressProps("address", e.target.value)}
        />
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-1">
          <label>Postal Code</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="Postal Code"
            className="rounded-[15px] w-[100%] border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-3 text-black"
            value={code}
            onChange={(e) => setAddressProps("code", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>City</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="City"
            className="rounded-[15px] w-[100%] border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-3 text-black"
            value={city}
            onChange={(e) => setAddressProps("city", e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default AddressInput;
