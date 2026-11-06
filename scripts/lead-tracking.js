
(function () {
  'use strict';

  const STORAGE_KEY = 'hs_attribution_v1';
  const SUBMIT_KEY = 'hs_form_submitted';

  function safeGet(key) {
    try {
      return sessionStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function safeSet(key, value) {
    try {
      sessionStorage.setItem(key, value);
    } catch (e) {
      // O rastreamento não deve impedir o funcionamento do site.
    }
  }

  function getAttribution() {
    try {
      return JSON.parse(safeGet(STORAGE_KEY) || '{}');
    } catch (e) {
      return {};
    }
  }

  function saveAttribution(data) {
    safeSet(STORAGE_KEY, JSON.stringify(data));
  }

  function getSource() {
    const params = new URLSearchParams(window.location.search);

    const utmSource = (params.get('utm_source') || '').toLowerCase();
    const utmMedium = (params.get('utm_medium') || '').toLowerCase();

    const gclid = params.get('gclid');
    const gbraid = params.get('gbraid');
    const wbraid = params.get('wbraid');

    const paidMedium = [
      'cpc', 'ppc', 'paid', 'paidsearch',
      'display', 'paid_social', 'retargeting'
    ];

    if (
      gclid ||
      gbraid ||
      wbraid ||
      paidMedium.includes(utmMedium)
    ) {
      return utmSource || 'google';
    }

    if (utmSource) return utmSource;

    const referrer = document.referrer;

    if (referrer) {
      try {
        const host = new URL(referrer).hostname;

        if (
          host.includes('google.') ||
          host.includes('bing.') ||
          host.includes('yahoo.')
        ) {
          return 'organic';
        }

        if (host !== window.location.hostname) {
          return host;
        }
      } catch (e) {
        // Referrer inválido.
      }
    }

    return 'direct';
  }

  function getMedium(source) {
    const params = new URLSearchParams(window.location.search);
    const medium = params.get('utm_medium');

    if (medium) return medium;

    if (
      params.has('gclid') ||
      params.has('gbraid') ||
      params.has('wbraid')
    ) {
      return 'cpc';
    }

    if (source === 'organic') return 'organic';
    if (source === 'direct') return 'direct';

    return 'referral';
  }

  function getMediaLabel(source, medium) {
    const paid = [
      'cpc', 'ppc', 'paid', 'paidsearch',
      'display', 'paid_social', 'retargeting'
    ];

    if (
      paid.includes(medium.toLowerCase()) ||
      ['google', 'adwords'].includes(source.toLowerCase()) &&
      medium !== 'organic'
    ) {
      return 'Google Ads';
    }

    if (medium === 'organic' || source === 'organic') {
      return 'Orgânico';
    }

    if (source === 'direct') {
      return 'Direto';
    }

    if (medium === 'referral') {
      return 'Indicação';
    }

    return 'Outro';
  }

  function captureAttribution() {
    const params = new URLSearchParams(window.location.search);
    const data = getAttribution();

    const source = getSource();
    const medium = getMedium(source);

    const hasCampaignData =
      params.has('utm_source') ||
      params.has('utm_medium') ||
      params.has('utm_campaign') ||
      params.has('gclid') ||
      params.has('gbraid') ||
      params.has('wbraid');

    const currentPage =
      window.location.origin + window.location.pathname;

    const currentReferrer = document.referrer || '';

    // Primeiro contato: não substituir durante a sessão.
    if (!data.first_touch) {
      data.first_touch = {
        source: source,
        medium: medium,
        campaign: params.get('utm_campaign') || '',
        landing_page: currentPage
      };
    }

    // Último contato: atualizar quando houver campanha ou
    // quando o visitante chegar de uma origem externa.
    if (
      !data.last_touch ||
      hasCampaignData ||
      (
        currentReferrer &&
        !currentReferrer.includes(window.location.hostname)
      )
    ) {
      data.last_touch = {
        source: source,
        medium: medium,
        campaign: params.get('utm_campaign') || '',
        landing_page: currentPage
      };
    }

    // Guardar identificadores de clique durante a sessão.
    ['gclid', 'gbraid', 'wbraid'].forEach(function (key) {
      const value = params.get(key);
      if (value) data[key] = value;
    });

    if (!data.landing_page) {
      data.landing_page = currentPage;
    }

    if (!data.referrer && currentReferrer) {
        try {
            const referrerUrl = new URL(currentReferrer);

            if (referrerUrl.hostname !== window.location.hostname) {
            data.referrer = currentReferrer;
            }
        } catch (e) {
            data.referrer = '';
        }
    }

    data.media = getMediaLabel(
      data.last_touch.source,
      data.last_touch.medium
    );

    saveAttribution(data);
    return data;
  }

  function addHiddenField(form, name, value) {
    let input = form.querySelector(
      'input[name="' + name + '"]'
    );

    if (!input) {
      input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      form.appendChild(input);
    }

    input.value = value || '';
  }

  function prepareForm() {
    const form = document.getElementById('contactForm');

    if (!form) return;

    form.addEventListener('submit', function (event) {
      const phone = form.querySelector('[name="Telefone"]');

      // Respeita a validação telefônica já existente.
      if (phone) {
        const digits = phone.value.replace(/\D/g, '');

        if (![10, 11].includes(digits.length)) {
          return;
        }
      }

      const data = captureAttribution();
      const first = data.first_touch || {};
      const last = data.last_touch || {};

      const fields = {
        origem: data.media,
        canal_entrada: 'Formulário',
        midia: data.media,

        campanha: last.campaign,
        tipo_campanha: last.medium,
        grupo_ou_anuncio: new URLSearchParams(
          window.location.search
        ).get('utm_content') || '',
        termo_de_pesquisa: new URLSearchParams(
          window.location.search
        ).get('utm_term') || '',

        gclid: data.gclid || '',
        gbraid: data.gbraid || '',
        wbraid: data.wbraid || '',

        utm_source: last.source,
        utm_medium: last.medium,
        utm_campaign: last.campaign,
        utm_content: new URLSearchParams(
          window.location.search
        ).get('utm_content') || '',
        utm_term: new URLSearchParams(
          window.location.search
        ).get('utm_term') || '',

        landing_page: data.landing_page || '',
        referrer: data.referrer || '',

        primeiro_toque_source: first.source || '',
        primeiro_toque_medium: first.medium || '',
        primeiro_toque_campaign: first.campaign || '',
        primeiro_toque_landing_page: first.landing_page || '',

        ultimo_toque_source: last.source || '',
        ultimo_toque_medium: last.medium || '',
        ultimo_toque_campaign: last.campaign || '',
        ultimo_toque_landing_page: last.landing_page || ''
      };

      Object.keys(fields).forEach(function (name) {
        addHiddenField(form, name, fields[name]);
      });

      // Marca o início do envio. A página de obrigado
      // usará esta marca para controlar a conversão.
      safeSet(SUBMIT_KEY, '1');
    });
  }

  function prepareWhatsApp() {
  // Captura cliques em links do WhatsApp e no tooltip flutuante.
  // Não altera o link nem o texto da mensagem.
  document.addEventListener('click', function (event) {
    const target = event.target;

    if (!(target instanceof Element)) return;

    const whatsappLink = target.closest(
      'a[href*="wa.me/"], a[href*="api.whatsapp.com/send"]'
    );

    const tooltip = target.closest('#wa-tooltip');

    // Ignora cliques que não sejam relacionados ao WhatsApp.
    if (!whatsappLink && !tooltip) return;

    const data = captureAttribution();
    const first = data.first_touch || {};
    const last = data.last_touch || {};

    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: 'hs_whatsapp_click',

      canal_entrada: 'WhatsApp',
      midia: data.media || 'Outro',

      // Última origem identificada.
      utm_source: last.source || '',
      utm_medium: last.medium || '',
      utm_campaign: last.campaign || '',

      // Primeiro contato.
      primeiro_toque_source: first.source || '',
      primeiro_toque_medium: first.medium || '',
      primeiro_toque_campaign: first.campaign || '',

      // Identificadores de anúncios.
      gclid: data.gclid || '',
      gbraid: data.gbraid || '',
      wbraid: data.wbraid || '',

      // Dados da navegação.
      landing_page: data.landing_page || '',
      page_location: window.location.href,
      page_title: document.title,
      referrer: document.referrer || '',

      // Elemento clicado.
      link_url: whatsappLink ? whatsappLink.href : '',
      link_text: whatsappLink
        ? (whatsappLink.innerText || '').trim()
        : 'Tooltip WhatsApp'
    });
  }, true);
}

  function init() {
    captureAttribution();
    prepareForm();
    prepareWhatsApp();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
