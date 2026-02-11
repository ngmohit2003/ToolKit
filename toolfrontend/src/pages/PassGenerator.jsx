import { useState, useRef, useEffect } from "react";
import { FaCopy } from "react-icons/fa";

const PassGenerator = () => {
  const [passwordLength, setPasswordLength] = useState(10);
  const [password, setPassword] = useState("");
  const [strengthColor, setStrengthColor] = useState("#ccc");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPassword, setSelectedPassword] = useState("");

  const [includeUpper, setIncludeUpper] = useState(false);
  const [includeLower, setIncludeLower] = useState(false);
  const [includeNumber, setIncludeNumber] = useState(false);
  const [includeSymbol, setIncludeSymbol] = useState(false);
  const [userName, setUserName] = useState("");

  const copyMsgRef = useRef(null);
  const passwordRef = useRef(null);

  const symbols = "@#$&_+=|./";

  // ---------- helpers ----------
  const getRndInteger = (min, max) =>
    Math.floor(Math.random() * (max - min)) + min;

  const generateRandomNumber = () => getRndInteger(0, 10);
  const generateLowerCase = () =>
    String.fromCharCode(getRndInteger(97, 123));
  const generateUpperCase = () =>
    String.fromCharCode(getRndInteger(65, 91));
  const generateSymbol = () =>
    symbols.charAt(getRndInteger(0, symbols.length));

  // ---------- strength ----------
  const calcStrength = () => {
    if (
      includeUpper &&
      includeLower &&
      (includeNumber || includeSymbol) &&
      passwordLength >= 8
    ) {
      setStrengthColor("#0f0");
    } else if (
      (includeUpper || includeLower) &&
      (includeNumber || includeSymbol) &&
      passwordLength >= 6
    ) {
      setStrengthColor("#ff0");
    } else {
      setStrengthColor("#f00");
    }
  };

  useEffect(() => {
    calcStrength();
  }, [includeUpper, includeLower, includeNumber, includeSymbol, passwordLength]);

  // ---------- shuffle ----------
  const shufflePassword = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join("");
  };

  // ---------- RANDOM NAME BASED SUGGESTIONS ----------
  const randomCase = (str) =>
    str
      .split("")
      .map((ch) => (Math.random() > 0.5 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

  const randomNumber = (len = 3) =>
    Math.floor(Math.random() * Math.pow(10, len));

  const randomSymbol = () =>
    symbols.charAt(getRndInteger(0, symbols.length));

  const generateNameBasedSuggestions = (name) => {
    if (!name.trim()) return [];

    const baseName = name.trim();
    const patterns = [
      () => `${randomSymbol()}${randomCase(baseName)}${randomNumber(3)}`,
      () => `${randomCase(baseName)}${randomSymbol()}${randomNumber(2)}${randomSymbol()}`,
      () => `${randomSymbol()}${randomNumber(2)}_${randomCase(baseName)}`,
      () => `${randomCase(baseName)}-${randomNumber(3)}${randomSymbol()}`,
      () => `${randomNumber(2)}${randomSymbol()}${randomCase(baseName)}${randomNumber(1)}`
    ];

    const result = new Set();
    while (result.size < 5) {
      const fn = patterns[getRndInteger(0, patterns.length)];
      result.add(fn());
    }

    return Array.from(result);
  };

  // ---------- generate password ----------
  const generatePassword = () => {
    if (userName.trim()) {
      const newSuggestions = generateNameBasedSuggestions(userName);
      setSuggestions(newSuggestions);
      setPassword("");
      return;
    }

    let funcArr = [];
    if (includeUpper) funcArr.push(generateUpperCase);
    if (includeLower) funcArr.push(generateLowerCase);
    if (includeNumber) funcArr.push(generateRandomNumber);
    if (includeSymbol) funcArr.push(generateSymbol);

    if (funcArr.length === 0) return;

    let tempPassword = "";

    funcArr.forEach((fn) => {
      tempPassword += fn();
    });

    for (let i = 0; i < passwordLength - funcArr.length; i++) {
      const randIndex = getRndInteger(0, funcArr.length);
      tempPassword += funcArr[randIndex]();
    }

    tempPassword = shufflePassword(Array.from(tempPassword));
    setPassword(tempPassword.slice(0, passwordLength));
    setSuggestions([]);
    calcStrength();
  };

  // ---------- copy ----------
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      copyMsgRef.current.innerText = "Copied!";
      copyMsgRef.current.classList.add("active");
      setTimeout(() => copyMsgRef.current.classList.remove("active"), 2000);
    } catch {
      copyMsgRef.current.innerText = "Failed!";
    }
  };

  return (
    <div className="max-w-[960px] mx-auto py-20 h-[695px] flex flex-col gap-[12px] text-white">
      <div className="mx-auto p-4">
        <p className="text-2xl font-bold">Password Generator</p>
      </div>

      <div className="mx-auto relative">
        <input
          ref={passwordRef}
          value={password}
          placeholder="Password"
          readOnly
          className="bg-[#3D4754] rounded-md w-[488px] h-[32px] p-[15px]"
        />
        <button
          className="absolute right-[5px] top-[6px]"
          onClick={copyToClipboard}
        >
          <span
            ref={copyMsgRef}
            className="absolute top-[-25px] right-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 [&.active]:opacity-100"
          />
          <FaCopy />
        </button>
      </div>

      {suggestions.length > 0 && (
        <div className="mx-auto bg-[#3D4754] rounded-md w-[488px] mt-2">
          <select
            className="w-full bg-[#3D4754] p-2 rounded-md"
            value={selectedPassword}
            onChange={(e) => {
              setSelectedPassword(e.target.value);
              setPassword(e.target.value);
              setSuggestions([]);
            }}
          >
            <option value="">Select a password suggestion...</option>
            {suggestions.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex flex-col mx-auto gap-2">
        <label>Include Your Name</label>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name"
          className="bg-[#3D4754] rounded-md w-[488px] h-[32px] p-[10px]"
        />

        <div className="flex justify-between">
          <p>Password Length</p>
          <p>{passwordLength}</p>
        </div>

        <input
          type="range"
          min="1"
          max="20"
          value={passwordLength}
          onChange={(e) => setPasswordLength(+e.target.value)}
        />

        <label><input type="checkbox" onChange={(e) => setIncludeUpper(e.target.checked)} /> Uppercase</label>
        <label><input type="checkbox" onChange={(e) => setIncludeLower(e.target.checked)} /> Lowercase</label>
        <label><input type="checkbox" onChange={(e) => setIncludeNumber(e.target.checked)} /> Numbers</label>
        <label><input type="checkbox" onChange={(e) => setIncludeSymbol(e.target.checked)} /> Symbols</label>

        <div className="flex items-center gap-2">
          <p>Strength</p>
          <div
            className="w-[15px] h-[15px] rounded-full border"
            style={{ backgroundColor: strengthColor }}
          />
        </div>

        <button
          className="p-2 rounded-md bg-[#1A80E5]"
          onClick={generatePassword}
        >
          GENERATE PASSWORD
        </button>
      </div>
    </div>
  );
};

export default PassGenerator;
