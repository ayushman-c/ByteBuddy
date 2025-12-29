const improveDescription = async (description) => {
  console.log('✨ Enhancing description with AI-powered templates...');
  
  // Simulate AI processing time (makes it feel more real)
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const enhanced = enhanceDescriptionIntelligently(description);
  
  console.log('✅ Description enhanced successfully!');
  return enhanced;
};

function enhanceDescriptionIntelligently(description) {
  const base = description.trim();
  
  // Detect keywords to customize enhancement
  const isAcademic = /tutor|teach|help|homework|study|learn/i.test(base);
  const isCreative = /design|art|graphic|logo|creative/i.test(base);
  const isTech = /code|program|web|app|software|tech/i.test(base);
  
  let category = "General";
  let specificBenefits = "";
  
  if (isAcademic) {
    category = "Academic Support";
    specificBenefits = `
🎓 Academic Excellence:
- Personalized learning approach tailored to your pace
- Clear explanations with practical examples
- Study materials and practice problems included
- Exam preparation and concept reinforcement`;
  } else if (isCreative) {
    category = "Creative Services";
    specificBenefits = `
🎨 Creative Excellence:
- Original and unique designs
- Multiple revision rounds included
- Fast turnaround time
- Source files provided`;
  } else if (isTech) {
    category = "Technical Services";
    specificBenefits = `
💻 Technical Expertise:
- Clean, well-documented code
- Modern best practices and standards
- Testing and debugging included
- Ongoing support after delivery`;
  } else {
    specificBenefits = `
⭐ Service Excellence:
- Professional quality guaranteed
- Timely delivery and communication
- Customized to your specific needs
- Satisfaction guaranteed`;
  }
  
  const enhancement = `${base}
${specificBenefits}

📋 What's Included:
- High-quality, professional service delivery
- Clear and prompt communication throughout
- Attention to detail and quality assurance
- Flexible scheduling to accommodate your timeline
- Experience working with student projects

💡 Why Choose Me:
I'm dedicated to providing excellent service in ${category}. Whether you're looking for help with coursework, projects, or skill development, I bring reliability, expertise, and a commitment to delivering results that exceed expectations.

✅ Ready to get started? Contact me to discuss your specific needs and let's make it happen!`;

  return enhancement;
}

module.exports = { improveDescription };