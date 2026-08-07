(function(){
 const form=document.querySelector('[data-form-lancamento]');
 if(!form)return;
 const painel=document.querySelector('[data-painel-documentos]');
 const texto=(n,f='a informar')=>form.elements[n]?.value?.trim()||f;
 const moeda=(v)=>{const n=Number(String(v).replace(',','.'));return Number.isFinite(n)?n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}):'a definir'};
 function preencher(){
  const d={autor:texto('autor'),livro:texto('livro'),paginas:texto('paginas'),genero:texto('genero'),resumo:texto('resumo'),objetivo:texto('objetivo'),quantidade:texto('quantidade'),valor:moeda(texto('valor','')),meta:moeda(texto('meta','')),data:texto('data'),hora:texto('hora'),local:texto('local'),cidade:texto('cidade'),pastor:texto('pastor','Pastor(a)/Dirigente'),igreja:texto('igreja','Igreja/Comunidade'),pix:texto('pix','a informar')};
  document.querySelectorAll('[data-campo]').forEach(el=>{const k=el.dataset.campo;el.textContent=d[k]||'a informar'});
  try{localStorage.setItem('planejamentoLancamento',JSON.stringify(d))}catch(e){}
  painel.classList.add('ativo');painel.scrollIntoView({behavior:'smooth'});
 }
 form.addEventListener('submit',e=>{e.preventDefault();if(form.reportValidity())preencher()});
 document.querySelectorAll('[data-aba]').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('[data-aba]').forEach(b=>b.classList.remove('ativa'));btn.classList.add('ativa');
  document.querySelectorAll('[data-documento]').forEach(d=>d.hidden=d.dataset.documento!==btn.dataset.aba);
 }));
 document.querySelectorAll('[data-imprimir]').forEach(b=>b.addEventListener('click',()=>window.print()));
})();
