(function(){
  const form=document.querySelector('[data-piloto-form]');
  if(!form)return;
  const retorno=document.querySelector('[data-piloto-retorno]');
  const protocoloEl=document.querySelector('[data-protocolo]');
  const mensagemEl=document.querySelector('[data-mensagem]');
  const whatsapp=document.querySelector('[data-whatsapp]');
  const email=document.querySelector('[data-email]');
  const copiar=document.querySelector('[data-copiar]');
  const gerarProtocolo=()=>{
    const agora=new Date();
    const parte=[agora.getFullYear(),String(agora.getMonth()+1).padStart(2,'0'),String(agora.getDate()).padStart(2,'0')].join('');
    const hora=[String(agora.getHours()).padStart(2,'0'),String(agora.getMinutes()).padStart(2,'0')].join('');
    const sufixo=Math.random().toString(36).slice(2,5).toUpperCase();
    return `AR-${parte}-${hora}-${sufixo}`;
  };
  const valor=(nome)=>form.elements[nome]?.value?.trim()||'Não informado';
  form.addEventListener('submit',(evento)=>{
    evento.preventDefault();
    if(!form.reportValidity())return;
    const protocolo=gerarProtocolo();
    const mensagem=[
      'PROJETO AUTOR RENOVADO — PEDIDO DE AMOSTRA',
      `Protocolo: ${protocolo}`,
      '',
      `Nome: ${valor('nome')}`,
      `Nome de autor/pseudônimo: ${valor('nomeAutor')}`,
      `Cidade/UF: ${valor('cidade')}`,
      `Título da obra: ${valor('titulo')}`,
      `Situação da obra: ${valor('situacao')}`,
      `Material que será enviado: ${valor('material')}`,
      `Como prefere se comunicar: ${valor('comunicacao')}`,
      `Sobre a obra: ${valor('descricao')}`,
      '',
      'Declaro que sou titular do material ou tenho autorização para enviá-lo. Autorizo somente a análise preliminar da amostra; este envio não autoriza publicação, distribuição ou transferência de direitos.',
      '',
      'Agora vou anexar a amostra nesta conversa.'
    ].join('\n');
    protocoloEl.textContent=protocolo;
    mensagemEl.value=mensagem;
    whatsapp.href=`https://wa.me/5522998001154?text=${encodeURIComponent(mensagem)}`;
    email.href=`mailto:graficasomarealiza@gmail.com?subject=${encodeURIComponent('Amostra Autor Renovado — '+protocolo)}&body=${encodeURIComponent(mensagem+'\n\nAnexarei a amostra a este e-mail.')}`;
    retorno.hidden=false;
    try{localStorage.setItem('ultimoProtocoloAutorRenovado',protocolo)}catch(e){}
    retorno.scrollIntoView({behavior:'smooth',block:'start'});
  });
  copiar.addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(mensagemEl.value);copiar.textContent='Mensagem copiada!'}
    catch(e){mensagemEl.select();document.execCommand('copy');copiar.textContent='Mensagem copiada!'}
    setTimeout(()=>copiar.textContent='Copiar mensagem',2200);
  });
})();
