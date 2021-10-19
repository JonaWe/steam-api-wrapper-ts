// This file is autogenerated by a script

export interface PortalAdapter {
  stats: PortalStats;
  achievements: PortalAchievements;
}

interface PortalStats {
  /**
   * ### PORTAL_TRANSMISSION_RECEIVED_STAT
   * - default value: `0`
   */
  PORTAL_TRANSMISSION_RECEIVED_STAT: number;
}

interface PortalAchievements {
  /**
   * ### Lab Rat
   * Acquire the fully powered Aperture Science Handheld Portal Device.
   * - default value: `false`
   * - hidden: `false`
   */
  PORTAL_GET_PORTALGUNS: boolean;

  /**
   * ### Fratricide
   * Do whatever it takes to survive.
   * - default value: `false`
   * - hidden: `false`
   */
  PORTAL_KILL_COMPANIONCUBE: boolean;

  /**
   * ### Partygoer
   * Make the correct party escort submission position decision.
   * - default value: `false`
   * - hidden: `false`
   */
  PORTAL_ESCAPE_TESTCHAMBERS: boolean;

  /**
   * ### Heartbreaker
   * Complete Portal.
   * - default value: `false`
   * - hidden: `false`
   */
  PORTAL_BEAT_GAME: boolean;

  /**
   * ### Terminal Velocity
   * Fall 30,000 feet.
   * - default value: `false`
   * - hidden: `false`
   */
  PORTAL_INFINITEFALL: boolean;

  /**
   * ### Long Jump
   * Jump 300 feet.
   * - default value: `false`
   * - hidden: `false`
   */
  PORTAL_LONGJUMP: boolean;

  /**
   * ### Cupcake
   * Beat two Portal advanced maps.
   * - default value: `false`
   * - hidden: `false`
   */
  PORTAL_BEAT_2ADVANCEDMAPS: boolean;

  /**
   * ### Fruitcake
   * Beat four Portal advanced maps.
   * - default value: `false`
   * - hidden: `false`
   */
  PORTAL_BEAT_4ADVANCEDMAPS: boolean;

  /**
   * ### Vanilla Crazy Cake
   * Beat all six Portal advanced maps.
   * - default value: `false`
   * - hidden: `false`
   */
  PORTAL_BEAT_6ADVANCEDMAPS: boolean;

  /**
   * ### Basic Science
   * Earn bronze medals on all Portal challenges.
   * - default value: `false`
   * - hidden: `false`
   */
  PORTAL_GET_ALLBRONZE: boolean;

  /**
   * ### Rocket Science
   * Earn silver medals on all Portal challenges.
   * - default value: `false`
   * - hidden: `false`
   */
  PORTAL_GET_ALLSILVER: boolean;

  /**
   * ### Aperture Science
   * Earn gold medals on all Portal challenges.
   * - default value: `false`
   * - hidden: `false`
   */
  PORTAL_GET_ALLGOLD: boolean;

  /**
   * ### Camera Shy
   * Detach security cameras from the walls.
   * - default value: `false`
   * - hidden: `false`
   */
  PORTAL_DETACH_ALL_CAMERAS: boolean;

  /**
   * ### Friendly Fire
   * Knock down a turret with another turret.
   * - default value: `false`
   * - hidden: `false`
   */
  PORTAL_HIT_TURRET_WITH_TURRET: boolean;

  /**
   * ### Transmission Received
   * ..?
   * - default value: `false`
   * - hidden: `false`
   */
  PORTAL_TRANSMISSION_RECEIVED: boolean;
}
