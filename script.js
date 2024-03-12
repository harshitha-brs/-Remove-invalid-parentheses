const isValid = string => {
  let open = 0;
  for (const c of string) {
    if (c === "(") open++;
    // Increment open brackets
    else if (c === ")") {
      if (open === 0) return false; // If closing bracket, but no open bracket, this is invalid
      open--;
    }
  }
  return open === 0; // Open brackets should be zero for valid string
};

const removeInvalidParentheses = function(s) {
  const res = new Set();
  let open = 0;
  let adds = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] == "(") {
      open++;
    } else if (s[i] == ")") {
      if (open == 0) {
        adds++;
      } else {
        open--;
      }
    }
  }
  adds += open;

  const cache = {};

  function dfs(pars, invalids) {
    if (cache[pars]) {
      return;
    } else {
      cache[pars] = 1;
    }

    if (invalids == 0) {
      if (isValid(pars)) {
        res.add(pars);
      }
      return;
    }

    for (let i = 0; i < pars.length; i++) {
      let left = pars.substring(0, i);
      let right = pars.substring(i + 1);
      dfs(left + right, invalids - 1);
    }
  }

  dfs(s, adds);
  return res.size ? Array.from(res) : [""];
};

document.getElementById("submit").addEventListener("click", function() {
  const input = document.getElementById("tasksInput").value;
  const result = removeInvalidParentheses(input);
  document.getElementById("output").innerHTML =
    "<b>Output:</b> " + result.join(", ");
});
