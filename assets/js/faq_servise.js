
  // FAQ Accordion Toggle
  document.querySelectorAll('.accordion-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      const icon = button.querySelector('i');

      // Close all others
      document.querySelectorAll('.accordion-content').forEach(item => {
        if (item !== content) item.classList.add('hidden');
      });
      document.querySelectorAll('.accordion-toggle i').forEach(ic => {
        if (ic !== icon) ic.classList.remove('rotate-180');
      });

      // Toggle current one
      content.classList.toggle('hidden');
      icon.classList.toggle('rotate-180');
    });
  });

