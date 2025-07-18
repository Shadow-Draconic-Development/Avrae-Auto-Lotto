const rewardsContainer = document.getElementById('rewardsContainer');
const addRewardBtn = document.getElementById('addReward');
const jsonOutput = document.getElementById('jsonOutput');
const copyBtn = document.getElementById('copyToClipboard');
const toggleThemeBtn = document.getElementById('toggleTheme');

function createRewardElement() {
  const rewardDiv = document.createElement('div');
  rewardDiv.className = 'deck';
  
  rewardDiv.innerHTML = `
    <fieldset>
      <legend>Reward</legend>
      <input type="text" class="reward-name" placeholder="Reward name (e.g. reward1)">
      <input type="text" class="reward-text" placeholder="Reward description (supports inline rolling, simply use {} around dice e.g. {1d6})">
      <input type="number" class="reward-weight" placeholder="Weight (0 if you are wanting to remove the reward)" min="0" value="10">
      <button class="remove-reward">Remove</button>
    </fieldset>
  `;
  
  const removeBtn = rewardDiv.querySelector('.remove-reward');
  removeBtn.addEventListener('click', () => {
    rewardDiv.remove();
    updateJSON();
  });
  
  rewardsContainer.appendChild(rewardDiv);
  updateJSON();
}

function updateJSON() {
  const rewards = {};
  const rewardElements = document.querySelectorAll('.deck');
  
  rewardElements.forEach((element) => {
    const name = element.querySelector('.reward-name').value || `reward${rewardCount}`;
    const text = element.querySelector('.reward-text').value;
    const weight = parseInt(element.querySelector('.reward-weight').value) || 0;
    
    if (name) {
      if (weight <= 0)  {
        rewards[name] = "";
      } else if (text) {
        rewards[name] = {
          text: text,
          weight: weight
        };
      }
    }
  });
  
  const jsonString = JSON.stringify(output, null).replace(/'/g, "´"); // Use regex for compatibility
  jsonOutput.value = `'${jsonString}'`;
}

addRewardBtn.addEventListener('click', createRewardElement);

rewardsContainer.addEventListener('input', updateJSON);

copyBtn.addEventListener('click', () => {
  jsonOutput.select();
  document.execCommand('copy');
  copyBtn.textContent = 'Copied!';
  setTimeout(() => {
    copyBtn.textContent = 'Copy to Clipboard';
  }, 2000);
});

// Theme handling
function updateThemeButtonText() {
  const isDark = document.body.classList.contains('dark-mode') || 
                (window.matchMedia('(prefers-color-scheme: dark)').matches && 
                 !document.body.classList.contains('light-mode'));
  toggleThemeBtn.textContent = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
}

toggleThemeBtn.addEventListener('click', () => {
  if (document.body.classList.contains('dark-mode')) {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
  } else if (document.body.classList.contains('light-mode')) {
    document.body.classList.remove('light-mode');
  } else {
    document.body.classList.add('dark-mode');
  }
  updateThemeButtonText();
});

// Set initial theme based on system preference
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add('dark-mode');
}
updateThemeButtonText();

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!document.body.classList.contains('light-mode')) {
    document.body.classList.toggle('dark-mode', e.matches);
    updateThemeButtonText();
  }
});

// Add initial reward
createRewardElement();